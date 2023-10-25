import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as  getEntitiesBoitierCapteur,deleteEntity as deleteEntityBoitierCapteur} from '../boitier-capteur/boitier-capteur.reducer';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './boitier.reducer';

export const BoitierDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
    dispatch(getEntitiesBoitierCapteur({}));
  }, []);

  const boitierEntity = useAppSelector(state => state.boitier.entity);
  const updateSuccess = useAppSelector(state => state.boitier.updateSuccess);
  const boitierCapteurEntities = useAppSelector(state => state.boitierCapteur.entities);

  const handleClose = () => {
    navigate('/boitier');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
        const relatedCapteurs = boitierCapteurEntities.filter((entry) => entry.boitiers.id === boitierEntity.id);
        if(relatedCapteurs !== null){
        for(const c of relatedCapteurs){
          dispatch(deleteEntityBoitierCapteur(c.id));
        }
        dispatch(deleteEntity(boitierEntity.id));
      }
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="boitierDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="appBiomedicaleApp.boitier.delete.question">
        <Translate contentKey="appBiomedicaleApp.boitier.delete.question" interpolate={{ id: boitierEntity.id }}>
          Are you sure you want to delete this Boitier?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-boitier" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BoitierDeleteDialog;
