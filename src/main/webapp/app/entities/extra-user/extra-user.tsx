import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import {Translate, TextFormat, openFile} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtraUser } from 'app/shared/model/extra-user.model';
import { getEntities } from './extra-user.reducer';

export const ExtraUser = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const extraUserList = useAppSelector(state => state.extraUser.entities);
  const loading = useAppSelector(state => state.extraUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="extra-user-heading" data-cy="ExtraUserHeading">
        <Translate contentKey="appBiomedicaleApp.extraUser.home.title">Extra Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appBiomedicaleApp.extraUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/extra-user/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appBiomedicaleApp.extraUser.home.createLabel">Create new Extra User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {extraUserList && extraUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.cin">Cin</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.photo">Photo</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.numeroTelephone">Numero Telephone</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.dateNaissance">Date Naissance</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.nationalite">Nationalite</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.adresse">Adresse</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.genre">Genre</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.extraUser.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {extraUserList.map((extraUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/extra-user/${extraUser.id}`} color="link" size="sm">
                      {extraUser.id}
                    </Button>
                  </td>
                  <td>{extraUser.cin}</td>
                  <td>
                    {extraUser.photo ? (
                      <div>
                        {extraUser.photoContentType ? (
                          <a onClick={openFile(extraUser.photoContentType, extraUser.photo)}>
                            <img src={`data:${extraUser.photoContentType};base64,${extraUser.photo}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </td>
                  <td>{extraUser.numeroTelephone}</td>
                  <td>
                    {extraUser.dateNaissance ? (
                      <TextFormat type="date" value={extraUser.dateNaissance} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{extraUser.nationalite}</td>
                  <td>{extraUser.adresse}</td>
                  <td>{extraUser.genre}</td>
                  <td>{extraUser.user ? extraUser.user.id : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/extra-user/${extraUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/extra-user/${extraUser.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/extra-user/${extraUser.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="appBiomedicaleApp.extraUser.home.notFound">No Extra Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExtraUser;
