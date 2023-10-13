import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBoitierPatient } from 'app/shared/model/boitier-patient.model';
import { getEntities } from './boitier-patient.reducer';

export const BoitierPatient = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const boitierPatientList = useAppSelector(state => state.boitierPatient.entities);
  const loading = useAppSelector(state => state.boitierPatient.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="boitier-patient-heading" data-cy="BoitierPatientHeading">
        <Translate contentKey="appBiomedicaleApp.boitierPatient.home.title">Boitier Patients</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appBiomedicaleApp.boitierPatient.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/boitier-patient/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appBiomedicaleApp.boitierPatient.home.createLabel">Create new Boitier Patient</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {boitierPatientList && boitierPatientList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="appBiomedicaleApp.boitierPatient.dateDebut">Date Debut</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.boitierPatient.dateFin">Date Fin</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.boitierPatient.boitiers">Boitiers</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.boitierPatient.patients">Patients</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {boitierPatientList.map((boitierPatient, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    {boitierPatient.dateDebut ? (
                      <TextFormat type="date" value={boitierPatient.dateDebut} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {boitierPatient.dateFin ? (
                      <TextFormat type="date" value={boitierPatient.dateFin} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {boitierPatient.boitiers ? <Link to={`/boitier/${boitierPatient.boitiers.id}`}>{boitierPatient.boitiers.id}</Link> : ''}
                  </td>
                  <td>
                    {boitierPatient.patients ? <Link to={`/patient/${boitierPatient.patients.id}`}>{boitierPatient.patients.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/boitier-patient/${boitierPatient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/boitier-patient/${boitierPatient.id}/edit`}
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
                        to={`/boitier-patient/${boitierPatient.id}/delete`}
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
              <Translate contentKey="appBiomedicaleApp.boitierPatient.home.notFound">No Boitier Patients found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BoitierPatient;
