import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as getEntitiesMedecinPatient ,createEntity as createEntityMedecinPatient, updateEntity as updateEntityMedecinPatient,deleteEntity  as deleteEntityMedecinPatient } from 'app/entities/medecin-patient/medecin-patient.reducer';
import { getUsers,createUser,getRoles,updateUser,deleteUser } from 'app/modules/administration/user-management/user-management.reducer';
import{ createEntity as cretaeEntityExtraUser,updateEntity as updateEntityExtraUser,deleteEntity as deleteEntityExtraUser } from 'app/entities/extra-user/extra-user.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './patient.reducer';
import { getEntities as getEntitiesBoitierPatient, updateEntity, createEntity,deleteEntity as deleteEntityBoitierPatient } from 'app/entities/boitier-patient/boitier-patient.reducer';
import { getEntities as getExtraUsers } from 'app/entities/extra-user/extra-user.reducer';
export const PatientDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const userextra = useAppSelector(state => state.extraUser.entities);
  const user = useAppSelector(state => state.userManagement.user);

  const [loadModal, setLoadModal] = useState(false);
  const medecinPatientEnttity = useAppSelector(state => state.medecinPatient.entities);
  const boitierPatientEnttity = useAppSelector(state => state.boitierPatient.entities);

  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getExtraUsers({}));
    dispatch(getUsers({}));
    dispatch(getRoles());
    dispatch(getEntitiesMedecinPatient({}));
    dispatch(getEntitiesBoitierPatient({}));
    setLoadModal(true);
  }, []);

  const patientEntity = useAppSelector(state => state.patient.entity);
  const updateSuccess = useAppSelector(state => state.patient.updateSuccess);

  const handleClose = () => {
    navigate('/patient');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = async () => {
    try {
      const relatedMedecinPatients = medecinPatientEnttity.filter((entry) => entry.patients && entry.patients.id === patientEntity.id);
      for (const medecinPatient of relatedMedecinPatients) {
        await dispatch(deleteEntityMedecinPatient(medecinPatient.id));
      }
      const relatedBoitierPatients = boitierPatientEnttity.filter((entry) => entry.patients && entry.patients.id === patientEntity.id);
      for (const boitierPatient of relatedBoitierPatients) {
        await dispatch(deleteEntityBoitierPatient(boitierPatient.id));
      }
      await dispatch(deleteEntity(patientEntity.id));
      const relatedExtraUser = userextra.find((entry) => entry && entry.id === patientEntity.extraUserId.id);
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
      <ModalHeader toggle={handleClose} data-cy="patientDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="appBiomedicaleApp.patient.delete.question">
        <Translate contentKey="appBiomedicaleApp.patient.delete.question" interpolate={{ id: patientEntity.id }}>
          Are you sure you want to delete this Patient?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-patient" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PatientDeleteDialog;
