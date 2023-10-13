import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBoitier } from 'app/shared/model/boitier.model';
import { getEntities as getBoitiers } from 'app/entities/boitier/boitier.reducer';
import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { IBoitierPatient } from 'app/shared/model/boitier-patient.model';
import { getEntity, updateEntity, createEntity, reset } from './boitier-patient.reducer';

export const BoitierPatientUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const boitiers = useAppSelector(state => state.boitier.entities);
  const patients = useAppSelector(state => state.patient.entities);
  const boitierPatientEntity = useAppSelector(state => state.boitierPatient.entity);
  const loading = useAppSelector(state => state.boitierPatient.loading);
  const updating = useAppSelector(state => state.boitierPatient.updating);
  const updateSuccess = useAppSelector(state => state.boitierPatient.updateSuccess);

  const handleClose = () => {
    navigate('/boitier-patient');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBoitiers({}));
    dispatch(getPatients({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...boitierPatientEntity,
      ...values,
      boitiers: boitiers.find(it => it.id.toString() === values.boitiers.toString()),
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
          ...boitierPatientEntity,
          boitiers: boitierPatientEntity?.boitiers?.id,
          patients: boitierPatientEntity?.patients?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="appBiomedicaleApp.boitierPatient.home.createOrEditLabel" data-cy="BoitierPatientCreateUpdateHeading">
            <Translate contentKey="appBiomedicaleApp.boitierPatient.home.createOrEditLabel">Create or edit a BoitierPatient</Translate>
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
                  id="boitier-patient-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('appBiomedicaleApp.boitierPatient.dateDebut')}
                id="boitier-patient-dateDebut"
                name="dateDebut"
                data-cy="dateDebut"
                type="date"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.boitierPatient.dateFin')}
                id="boitier-patient-dateFin"
                name="dateFin"
                data-cy="dateFin"
                type="date"
              />
              <ValidatedField
                id="boitier-patient-boitiers"
                name="boitiers"
                data-cy="boitiers"
                label={translate('appBiomedicaleApp.boitierPatient.boitiers')}
                type="select"
              >
                <option value="" key="0" />
                {boitiers
                  ? boitiers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="boitier-patient-patients"
                name="patients"
                data-cy="patients"
                label={translate('appBiomedicaleApp.boitierPatient.patients')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/boitier-patient" replace color="info">
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

export default BoitierPatientUpdate;
