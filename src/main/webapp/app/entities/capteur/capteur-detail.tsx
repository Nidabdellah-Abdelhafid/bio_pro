import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './capteur.reducer';

export const CapteurDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const capteurEntity = useAppSelector(state => state.capteur.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="capteurDetailsHeading">
          <Translate contentKey="appBiomedicaleApp.capteur.detail.title">Capteur</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{capteurEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="appBiomedicaleApp.capteur.type">Type</Translate>
            </span>
          </dt>
          <dd>{capteurEntity.type}</dd>
          <dt>
            <span id="reference">
              <Translate contentKey="appBiomedicaleApp.capteur.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{capteurEntity.reference}</dd>
          <dt>
            <span id="resolution">
              <Translate contentKey="appBiomedicaleApp.capteur.resolution">Resolution</Translate>
            </span>
          </dt>
          <dd>{capteurEntity.resolution}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="appBiomedicaleApp.capteur.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {capteurEntity.photo ? (
              <div>
                {capteurEntity.photoContentType ? (
                  <a onClick={openFile(capteurEntity.photoContentType, capteurEntity.photo)}>
                    <img src={`data:${capteurEntity.photoContentType};base64,${capteurEntity.photo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {capteurEntity.photoContentType}, {byteSize(capteurEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="valeurMin">
              <Translate contentKey="appBiomedicaleApp.capteur.valeurMin">Valeur Min</Translate>
            </span>
          </dt>
          <dd>{capteurEntity.valeurMin}</dd>
          <dt>
            <span id="valeurMax">
              <Translate contentKey="appBiomedicaleApp.capteur.valeurMax">Valeur Max</Translate>
            </span>
          </dt>
          <dd>{capteurEntity.valeurMax}</dd>
        </dl>
        <Button tag={Link} to="/capteur" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/capteur/${capteurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CapteurDetail;
