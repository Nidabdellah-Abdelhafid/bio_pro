import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtraUser } from 'app/shared/model/extra-user.model';
import { getEntities as getExtraUsers } from 'app/entities/extra-user/extra-user.reducer';
import { IMedecin } from 'app/shared/model/medecin.model';
import { getEntity, updateEntity, createEntity, reset } from './medecin.reducer';

export const MedecinUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const extraUsers = useAppSelector(state => state.extraUser.entities);
  const medecinEntity = useAppSelector(state => state.medecin.entity);
  const loading = useAppSelector(state => state.medecin.loading);
  const updating = useAppSelector(state => state.medecin.updating);
  const updateSuccess = useAppSelector(state => state.medecin.updateSuccess);

  const handleClose = () => {
    navigate('/medecin');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getExtraUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...medecinEntity,
      ...values,
      extraUserId: extraUsers.find(it => it.id.toString() === values.extraUserId.toString()),
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
          ...medecinEntity,
          extraUserId: medecinEntity?.extraUserId?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="appBiomedicaleApp.medecin.home.createOrEditLabel" data-cy="MedecinCreateUpdateHeading">
            <Translate contentKey="appBiomedicaleApp.medecin.home.createOrEditLabel">Create or edit a Medecin</Translate>
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
                  id="medecin-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('appBiomedicaleApp.medecin.specialite')}
                id="medecin-specialite"
                name="specialite"
                data-cy="specialite"
                type="text"
              />
              <ValidatedField
                id="medecin-extraUserId"
                name="extraUserId"
                data-cy="extraUserId"
                label={translate('appBiomedicaleApp.medecin.extraUserId')}
                type="select"
              >
                <option value="" key="0" />
                {extraUsers
                  ? extraUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/medecin" replace color="info">
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

export default MedecinUpdate;
