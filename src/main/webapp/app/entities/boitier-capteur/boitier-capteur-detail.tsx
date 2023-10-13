import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './boitier-capteur.reducer';

export const BoitierCapteurDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const boitierCapteurEntity = useAppSelector(state => state.boitierCapteur.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="boitierCapteurDetailsHeading">
          <Translate contentKey="appBiomedicaleApp.boitierCapteur.detail.title">BoitierCapteur</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{boitierCapteurEntity.id}</dd>
          <dt>
            <span id="branche">
              <Translate contentKey="appBiomedicaleApp.boitierCapteur.branche">Branche</Translate>
            </span>
          </dt>
          <dd>{boitierCapteurEntity.branche}</dd>
          <dt>
            <span id="etat">
              <Translate contentKey="appBiomedicaleApp.boitierCapteur.etat">Etat</Translate>
            </span>
          </dt>
          <dd>{boitierCapteurEntity.etat ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="appBiomedicaleApp.boitierCapteur.boitiers">Boitiers</Translate>
          </dt>
          <dd>{boitierCapteurEntity.boitiers ? boitierCapteurEntity.boitiers.id : ''}</dd>
          <dt>
            <Translate contentKey="appBiomedicaleApp.boitierCapteur.capteurs">Capteurs</Translate>
          </dt>
          <dd>{boitierCapteurEntity.capteurs ? boitierCapteurEntity.capteurs.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/boitier-capteur" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/boitier-capteur/${boitierCapteurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BoitierCapteurDetail;
