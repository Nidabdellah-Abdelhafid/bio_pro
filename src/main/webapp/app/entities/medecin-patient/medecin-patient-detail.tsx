import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './medecin-patient.reducer';

export const MedecinPatientDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const medecinPatientEntity = useAppSelector(state => state.medecinPatient.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="medecinPatientDetailsHeading">
          <Translate contentKey="appBiomedicaleApp.medecinPatient.detail.title">MedecinPatient</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{medecinPatientEntity.id}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="appBiomedicaleApp.medecinPatient.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>
            {medecinPatientEntity.dateDebut ? (
              <TextFormat value={medecinPatientEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateFin">
              <Translate contentKey="appBiomedicaleApp.medecinPatient.dateFin">Date Fin</Translate>
            </span>
          </dt>
          <dd>
            {medecinPatientEntity.dateFin ? (
              <TextFormat value={medecinPatientEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="appBiomedicaleApp.medecinPatient.medecins">Medecins</Translate>
          </dt>
          <dd>{medecinPatientEntity.medecins ? medecinPatientEntity.medecins.id : ''}</dd>
          <dt>
            <Translate contentKey="appBiomedicaleApp.medecinPatient.patients">Patients</Translate>
          </dt>
          <dd>{medecinPatientEntity.patients ? medecinPatientEntity.patients.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/medecin-patient" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/medecin-patient/${medecinPatientEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MedecinPatientDetail;
