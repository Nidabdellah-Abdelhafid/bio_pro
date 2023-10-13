import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICapteur } from 'app/shared/model/capteur.model';
import { getEntities } from './capteur.reducer';

export const Capteur = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const capteurList = useAppSelector(state => state.capteur.entities);
  const loading = useAppSelector(state => state.capteur.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="capteur-heading" data-cy="CapteurHeading">
        <Translate contentKey="appBiomedicaleApp.capteur.home.title">Capteurs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appBiomedicaleApp.capteur.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/capteur/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appBiomedicaleApp.capteur.home.createLabel">Create new Capteur</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {capteurList && capteurList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="appBiomedicaleApp.capteur.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.capteur.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.capteur.reference">Reference</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.capteur.resolution">Resolution</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.capteur.photo">Photo</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.capteur.valeurMin">Valeur Min</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.capteur.valeurMax">Valeur Max</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {capteurList.map((capteur, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/capteur/${capteur.id}`} color="link" size="sm">
                      {capteur.id}
                    </Button>
                  </td>
                  <td>{capteur.type}</td>
                  <td>{capteur.reference}</td>
                  <td>{capteur.resolution}</td>
                  <td>
                    {capteur.photo ? (
                      <div>
                        {capteur.photoContentType ? (
                          <a onClick={openFile(capteur.photoContentType, capteur.photo)}>
                            <img src={`data:${capteur.photoContentType};base64,${capteur.photo}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </td>
                  <td>{capteur.valeurMin}</td>
                  <td>{capteur.valeurMax}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/capteur/${capteur.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/capteur/${capteur.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/capteur/${capteur.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="appBiomedicaleApp.capteur.home.notFound">No Capteurs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Capteur;
