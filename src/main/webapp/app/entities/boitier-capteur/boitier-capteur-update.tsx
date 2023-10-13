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
import { ICapteur } from 'app/shared/model/capteur.model';
import { getEntities as getCapteurs } from 'app/entities/capteur/capteur.reducer';
import { IBoitierCapteur } from 'app/shared/model/boitier-capteur.model';
import { getEntity, updateEntity, createEntity, reset } from './boitier-capteur.reducer';

export const BoitierCapteurUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const boitiers = useAppSelector(state => state.boitier.entities);
  const capteurs = useAppSelector(state => state.capteur.entities);
  const boitierCapteurEntity = useAppSelector(state => state.boitierCapteur.entity);
  const loading = useAppSelector(state => state.boitierCapteur.loading);
  const updating = useAppSelector(state => state.boitierCapteur.updating);
  const updateSuccess = useAppSelector(state => state.boitierCapteur.updateSuccess);

  const handleClose = () => {
    navigate('/boitier-capteur');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBoitiers({}));
    dispatch(getCapteurs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...boitierCapteurEntity,
      ...values,
      boitiers: boitiers.find(it => it.id.toString() === values.boitiers.toString()),
      capteurs: capteurs.find(it => it.id.toString() === values.capteurs.toString()),
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
          ...boitierCapteurEntity,
          boitiers: boitierCapteurEntity?.boitiers?.id,
          capteurs: boitierCapteurEntity?.capteurs?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="appBiomedicaleApp.boitierCapteur.home.createOrEditLabel" data-cy="BoitierCapteurCreateUpdateHeading">
            <Translate contentKey="appBiomedicaleApp.boitierCapteur.home.createOrEditLabel">Create or edit a BoitierCapteur</Translate>
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
                  id="boitier-capteur-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('appBiomedicaleApp.boitierCapteur.branche')}
                id="boitier-capteur-branche"
                name="branche"
                data-cy="branche"
                type="text"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.boitierCapteur.etat')}
                id="boitier-capteur-etat"
                name="etat"
                data-cy="etat"
                check
                type="checkbox"
              />
              <ValidatedField
                id="boitier-capteur-boitiers"
                name="boitiers"
                data-cy="boitiers"
                label={translate('appBiomedicaleApp.boitierCapteur.boitiers')}
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
                id="boitier-capteur-capteurs"
                name="capteurs"
                data-cy="capteurs"
                label={translate('appBiomedicaleApp.boitierCapteur.capteurs')}
                type="select"
              >
                <option value="" key="0" />
                {capteurs
                  ? capteurs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/boitier-capteur" replace color="info">
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

export default BoitierCapteurUpdate;
