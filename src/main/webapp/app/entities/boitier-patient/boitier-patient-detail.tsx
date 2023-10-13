import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './boitier-patient.reducer';

export const BoitierPatientDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const boitierPatientEntity = useAppSelector(state => state.boitierPatient.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="boitierPatientDetailsHeading">
          <Translate contentKey="appBiomedicaleApp.boitierPatient.detail.title">BoitierPatient</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{boitierPatientEntity.id}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="appBiomedicaleApp.boitierPatient.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            {boitierPatientEntity.dateDebut ? (
              <TextFormat value={boitierPatientEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="appBiomedicaleApp.boitierPatient.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            {boitierPatientEntity.dateFin ? (
              <TextFormat value={boitierPatientEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="appBiomedicaleApp.boitierPatient.boitiers">Boitiers</Translate>
          </dt>
          <dd>{boitierPatientEntity.boitiers ? boitierPatientEntity.boitiers.id : ''}</dd>
          <dt>
            <Translate contentKey="appBiomedicaleApp.boitierPatient.patients">Patients</Translate>
          </dt>
          <dd>{boitierPatientEntity.patients ? boitierPatientEntity.patients.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/boitier-patient" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/boitier-patient/${boitierPatientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BoitierPatientDetail;
