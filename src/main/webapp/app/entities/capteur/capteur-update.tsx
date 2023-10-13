import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICapteur } from 'app/shared/model/capteur.model';
import { getEntity, updateEntity, createEntity, reset } from './capteur.reducer';

export const CapteurUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const capteurEntity = useAppSelector(state => state.capteur.entity);
  const loading = useAppSelector(state => state.capteur.loading);
  const updating = useAppSelector(state => state.capteur.updating);
  const updateSuccess = useAppSelector(state => state.capteur.updateSuccess);

  const handleClose = () => {
    navigate('/capteur');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...capteurEntity,
      ...values,
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
          ...capteurEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="appBiomedicaleApp.capteur.home.createOrEditLabel" data-cy="CapteurCreateUpdateHeading">
            <Translate contentKey="appBiomedicaleApp.capteur.home.createOrEditLabel">Create or edit a Capteur</Translate>
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
                  id="capteur-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('appBiomedicaleApp.capteur.type')}
                id="capteur-type"
                name="type"
                data-cy="type"
                type="text"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.capteur.reference')}
                id="capteur-reference"
                name="reference"
                data-cy="reference"
                type="text"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.capteur.resolution')}
                id="capteur-resolution"
                name="resolution"
                data-cy="resolution"
                type="text"
              />
              <ValidatedBlobField
                label={translate('appBiomedicaleApp.capteur.photo')}
                id="capteur-photo"
                name="photo"
                data-cy="photo"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.capteur.valeurMin')}
                id="capteur-valeurMin"
                name="valeurMin"
                data-cy="valeurMin"
                type="text"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.capteur.valeurMax')}
                id="capteur-valeurMax"
                name="valeurMax"
                data-cy="valeurMax"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/capteur" replace color="info">
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

export default CapteurUpdate;
