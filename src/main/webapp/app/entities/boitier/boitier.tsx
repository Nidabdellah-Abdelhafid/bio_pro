import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBoitier } from 'app/shared/model/boitier.model';
import { getEntities } from './boitier.reducer';

export const Boitier = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const boitierList = useAppSelector(state => state.boitier.entities);
  const loading = useAppSelector(state => state.boitier.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="boitier-heading" data-cy="BoitierHeading">
        <Translate contentKey="appBiomedicaleApp.boitier.home.title">Boitiers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appBiomedicaleApp.boitier.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/boitier/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appBiomedicaleApp.boitier.home.createLabel">Create new Boitier</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {boitierList && boitierList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="appBiomedicaleApp.boitier.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.boitier.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.boitier.ref">Ref</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.boitier.nbrBranche">Nbr Branche</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {boitierList.map((boitier, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/boitier/${boitier.id}`} color="link" size="sm">
                      {boitier.id}
                    </Button>
                  </td>
                  <td>{boitier.type}</td>
                  <td>{boitier.ref}</td>
                  <td>{boitier.nbrBranche}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/boitier/${boitier.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/boitier/${boitier.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/boitier/${boitier.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="appBiomedicaleApp.boitier.home.notFound">No Boitiers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Boitier;
