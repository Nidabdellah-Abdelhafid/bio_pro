import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './medecin.reducer';

export const MedecinDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const medecinEntity = useAppSelector(state => state.medecin.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="medecinDetailsHeading">
          <Translate contentKey="appBiomedicaleApp.medecin.detail.title">Medecin</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{medecinEntity.id}</dd>
          <dt>
            <span id="specialite">
              <Translate contentKey="appBiomedicaleApp.medecin.specialite">Specialite</Translate>
            </span>
          </dt>
          <dd>{medecinEntity.specialite}</dd>
          <dt>
            <Translate contentKey="appBiomedicaleApp.medecin.extraUserId">Extra User Id</Translate>
          </dt>
          <dd>{medecinEntity.extraUserId ? medecinEntity.extraUserId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/medecin" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/medecin/${medecinEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MedecinDetail;
