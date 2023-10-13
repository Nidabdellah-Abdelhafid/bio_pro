import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './boitier.reducer';

export const BoitierDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const boitierEntity = useAppSelector(state => state.boitier.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="boitierDetailsHeading">
          <Translate contentKey="appBiomedicaleApp.boitier.detail.title">Boitier</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{boitierEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="appBiomedicaleApp.boitier.type">Type</Translate>
            </span>
          </dt>
          <dd>{boitierEntity.type}</dd>
          <dt>
            <span id="ref">
              <Translate contentKey="appBiomedicaleApp.boitier.ref">Ref</Translate>
            </span>
          </dt>
          <dd>{boitierEntity.ref}</dd>
          <dt>
            <span id="nbrBranche">
              <Translate contentKey="appBiomedicaleApp.boitier.nbrBranche">Nbr Branche</Translate>
            </span>
          </dt>
          <dd>{boitierEntity.nbrBranche}</dd>
        </dl>
        <Button tag={Link} to="/boitier" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/boitier/${boitierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BoitierDetail;
