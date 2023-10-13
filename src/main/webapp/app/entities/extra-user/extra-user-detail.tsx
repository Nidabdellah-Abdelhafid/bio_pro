import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './extra-user.reducer';

export const ExtraUserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const extraUserEntity = useAppSelector(state => state.extraUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="extraUserDetailsHeading">
          <Translate contentKey="appBiomedicaleApp.extraUser.detail.title">ExtraUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{extraUserEntity.id}</dd>
          <dt>
            <span id="cin">
              <Translate contentKey="appBiomedicaleApp.extraUser.cin">Cin</Translate>
            </span>
          </dt>
          <dd>{extraUserEntity.cin}</dd>
          <dt>
            <span id="numeroTelephone">
              <Translate contentKey="appBiomedicaleApp.extraUser.numeroTelephone">Numero Telephone</Translate>
            </span>
          </dt>
          <dd>{extraUserEntity.numeroTelephone}</dd>
          <dt>
            <span id="dateNaissance">
              <Translate contentKey="appBiomedicaleApp.extraUser.dateNaissance">Date Naissance</Translate>
            </span>
          </dt>
          <dd>
            {extraUserEntity.dateNaissance ? (
              <TextFormat value={extraUserEntity.dateNaissance} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="nationalite">
              <Translate contentKey="appBiomedicaleApp.extraUser.nationalite">Nationalite</Translate>
            </span>
          </dt>
          <dd>{extraUserEntity.nationalite}</dd>
          <dt>
            <span id="adresse">
              <Translate contentKey="appBiomedicaleApp.extraUser.adresse">Adresse</Translate>
            </span>
          </dt>
          <dd>{extraUserEntity.adresse}</dd>
          <dt>
            <span id="genre">
              <Translate contentKey="appBiomedicaleApp.extraUser.genre">Genre</Translate>
            </span>
          </dt>
          <dd>{extraUserEntity.genre}</dd>
          <dt>
            <Translate contentKey="appBiomedicaleApp.extraUser.user">User</Translate>
          </dt>
          <dd>{extraUserEntity.user ? extraUserEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/extra-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/extra-user/${extraUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExtraUserDetail;
