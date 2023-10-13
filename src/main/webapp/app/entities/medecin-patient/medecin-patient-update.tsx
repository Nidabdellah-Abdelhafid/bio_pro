import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMedecin } from 'app/shared/model/medecin.model';
import { getEntities as getMedecins } from 'app/entities/medecin/medecin.reducer';
import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { IMedecinPatient } from 'app/shared/model/medecin-patient.model';
import { getEntity, updateEntity, createEntity, reset } from './medecin-patient.reducer';

export const MedecinPatientUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const medecins = useAppSelector(state => state.medecin.entities);
  const patients = useAppSelector(state => state.patient.entities);
  const medecinPatientEntity = useAppSelector(state => state.medecinPatient.entity);
  const loading = useAppSelector(state => state.medecinPatient.loading);
  const updating = useAppSelector(state => state.medecinPatient.updating);
  const updateSuccess = useAppSelector(state => state.medecinPatient.updateSuccess);

  const handleClose = () => {
    navigate('/medecin-patient');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getMedecins({}));
    dispatch(getPatients({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...medecinPatientEntity,
      ...values,
      medecins: medecins.find(it => it.id.toString() === values.medecins.toString()),
      patients: patients.find(it => it.id.toString() === values.patients.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...medecinPatientEntity,
          medecins: medecinPatientEntity?.medecins?.id,
          patients: medecinPatientEntity?.patients?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="appBiomedicaleApp.medecinPatient.home.createOrEditLabel" data-cy="MedecinPatientCreateUpdateHeading">
            <Translate contentKey="appBiomedicaleApp.medecinPatient.home.createOrEditLabel">Create or edit a MedecinPatient</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="medecin-patient-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('appBiomedicaleApp.medecinPatient.dateDebut')}
                id="medecin-patient-dateDebut"
                name="dateDebut"
                data-cy="dateDebut"
                type="date"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.medecinPatient.dateFin')}
                id="medecin-patient-dateFin"
                name="dateFin"
                data-cy="dateFin"
                type="date"
              />
              <ValidatedField
                id="medecin-patient-medecins"
                name="medecins"
                data-cy="medecins"
                label={translate('appBiomedicaleApp.medecinPatient.medecins')}
                type="select"
              >
                <option value="" key="0" />
                {medecins
                  ? medecins.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="medecin-patient-patients"
                name="patients"
                data-cy="patients"
                label={translate('appBiomedicaleApp.medecinPatient.patients')}
                type="select"
              >
                <option value="" key="0" />
                {patients
                  ? patients.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/medecin-patient" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MedecinPatientUpdate;
