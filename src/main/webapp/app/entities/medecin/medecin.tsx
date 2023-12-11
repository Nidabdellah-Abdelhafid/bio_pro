import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import {openFile, Translate} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as getExtraUsers } from 'app/entities/extra-user/extra-user.reducer';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMedecin } from 'app/shared/model/medecin.model';
import { getEntities } from './medecin.reducer';

export const Medecin = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const medecinPatientEntity = useAppSelector(state => state.medecinPatient.entities);
  const medecinList = useAppSelector(state => state.medecin.entities);
  const loading = useAppSelector(state => state.medecin.loading);
  const userextra = useAppSelector(state => state.extraUser.entities);
  const user = useAppSelector(state => state.userManagement.user);

  useEffect(() => {
    dispatch(getEntities({}));
    dispatch(getExtraUsers({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));

  };

  return (
    <div>
      <h2 id="medecin-heading" data-cy="MedecinHeading">
        <Translate contentKey="appBiomedicaleApp.medecin.home.title">Medecins</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appBiomedicaleApp.medecin.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/medecin/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appBiomedicaleApp.medecin.home.createLabel">Create new Medecin</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {medecinList && medecinList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th>
                <Translate contentKey="appBiomedicaleApp.medecin.id">ID</Translate>
              </th>
              <th>
                Photo
              </th>
              <th>
                <Translate contentKey="appBiomedicaleApp.medecin.specialite">Specialite</Translate>
              </th>
              <th>
                Nom médecin
              </th>

              <th>
                Email
              </th>
              <th>
                Nationalite
              </th>
              <th>
                Adresse
              </th>
              <th />
            </tr>
            </thead>
            <tbody>
            {medecinList.map((medecin, i) => {
              // Déplacer la logique de recherche du nom du médecin ici
              let NomMedecin = "N"; // Initialisez avec "N" par défaut
              let photo1 = "N"; // Initialisez avec "N" par défaut
              let photo2 = "N"; // Initialisez avec "N" par défaut

              let emaill = "N"; // Initialisez avec "N" par défaut
              let nationalitte = "N"; // Initialisez avec "N" par défaut
              let addressee = "N"; // Initialisez avec "N" par défaut

              const matchingExtra = userextra.find((extra) => extra.id === medecin.extraUserId.id);

              if (matchingExtra) {
                NomMedecin = `${matchingExtra.user.lastName} ${matchingExtra.user.firstName}`;
                photo1 = matchingExtra.photo;
                photo2 = matchingExtra.photoContentType;

                emaill=matchingExtra.user.email;
                nationalitte=matchingExtra.nationalite;
                addressee=matchingExtra.adresse;

              }

              return (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/medecin/${medecin.id}`} color="link" size="sm">
                      {medecin.id}
                    </Button>
                  </td>
                  <td>
                    {photo1 ? (
                      <div>
                        {photo2 ? (
                          <a onClick={openFile(photo2, photo1)}>
                            <img src={`data:${photo2};base64,${photo1}`}     style={{ maxHeight: '80px',width:'90px' }}/>

                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </td>
                  <td>{medecin.specialite}</td>
                  <td>Dr.{NomMedecin}</td> {/* Affichez le nom du médecin ici */}

                  <td>{emaill}</td> {/* Affichez le nom du médecin ici */}

                  <td>{nationalitte}</td> {/* Affichez le nom du médecin ici */}
                  <td>{addressee}</td> {/* Affichez le nom du médecin ici */}

                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/medecin/${medecin.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                      </Button>
                      <Button tag={Link} to={`/medecin/${medecin.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                      </Button>
                      <Button tag={Link} to={`/medecin/${medecin.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="appBiomedicaleApp.medecin.home.notFound">No Medecins found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Medecin;
