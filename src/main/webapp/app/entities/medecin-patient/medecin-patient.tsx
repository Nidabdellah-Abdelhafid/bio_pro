import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMedecinPatient } from 'app/shared/model/medecin-patient.model';
import { getEntities } from './medecin-patient.reducer';

export const MedecinPatient = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const medecinPatientList = useAppSelector(state => state.medecinPatient.entities);
  const loading = useAppSelector(state => state.medecinPatient.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="medecin-patient-heading" data-cy="MedecinPatientHeading">
        <Translate contentKey="appBiomedicaleApp.medecinPatient.home.title">Medecin Patients</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appBiomedicaleApp.medecinPatient.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/medecin-patient/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appBiomedicaleApp.medecinPatient.home.createLabel">Create new Medecin Patient</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {medecinPatientList && medecinPatientList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="appBiomedicaleApp.medecinPatient.dateDebut">Date Debut</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.medecinPatient.dateFin">Date Fin</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.medecinPatient.medecins">Medecins</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.medecinPatient.patients">Patients</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {medecinPatientList.map((medecinPatient, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    {medecinPatient.dateDebut ? (
                      <TextFormat type="date" value={medecinPatient.dateDebut} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {medecinPatient.dateFin ? (
                      <TextFormat type="date" value={medecinPatient.dateFin} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {medecinPatient.medecins ? <Link to={`/medecin/${medecinPatient.medecins.id}`}>{medecinPatient.medecins.id}</Link> : ''}
                  </td>
                  <td>
                    {medecinPatient.patients ? <Link to={`/patient/${medecinPatient.patients.id}`}>{medecinPatient.patients.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/medecin-patient/${medecinPatient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/medecin-patient/${medecinPatient.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/medecin-patient/${medecinPatient.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="appBiomedicaleApp.medecinPatient.home.notFound">No Medecin Patients found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MedecinPatient;
