import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as getEntitiesMedecinPatient ,createEntity as createEntityMedecinPatient, updateEntity as updateEntityMedecinPatient,deleteEntity  as deleteEntityMedecinPatient } from 'app/entities/medecin-patient/medecin-patient.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './medecin.reducer';
import { getUsers,createUser,getRoles,updateUser,deleteUser } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getExtraUsers } from 'app/entities/extra-user/extra-user.reducer';
import{ createEntity as cretaeEntityExtraUser,updateEntity as updateEntityExtraUser,deleteEntity as deleteEntityExtraUser } from 'app/entities/extra-user/extra-user.reducer';

export const MedecinDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const userextra = useAppSelector(state => state.extraUser.entities);
  const user = useAppSelector(state => state.userManagement.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getExtraUsers({}));
    dispatch(getUsers({}));
    dispatch(getRoles());
    dispatch(getEntitiesMedecinPatient({}));
    setLoadModal(true);
  }, []);

  const medecinEntity = useAppSelector(state => state.medecin.entity);
  const updateSuccess = useAppSelector(state => state.medecin.updateSuccess);
  const medecinPatientEnttity = useAppSelector(state => state.medecinPatient.entities);

  const handleClose = () => {
    navigate('/medecin');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = async () => {
    try {
      const relatedMedecinPatients = medecinPatientEnttity.filter((entry) => entry.medecins && entry.medecins.id === medecinEntity.id);
      for (const medecinPatient of relatedMedecinPatients) {
        await dispatch(deleteEntityMedecinPatient(medecinPatient.id));
      }
      await dispatch(deleteEntity(medecinEntity.id));
      const relatedExtraUser = userextra.find((entry) => entry && entry.id === medecinEntity.extraUserId.id);
      if (relatedExtraUser) {
        await dispatch(deleteEntityExtraUser(relatedExtraUser.id));
        await dispatch(deleteUser(relatedExtraUser.user.id));
      }
      handleClose();
    } catch (error) {
      console.error("Error deleting related entities:", error);
    }
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="medecinDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="appBiomedicaleApp.medecin.delete.question">
        <Translate contentKey="appBiomedicaleApp.medecin.delete.question" interpolate={{ id: medecinEntity.id }}>
          Are you sure you want to delete this Medecin?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-medecin" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MedecinDeleteDialog;
