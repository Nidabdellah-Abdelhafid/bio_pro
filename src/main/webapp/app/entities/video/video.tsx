import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IVideo } from 'app/shared/model/video.model';
import { getEntities } from './video.reducer';

export const Video = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const videoList = useAppSelector(state => state.video.entities);
  const loading = useAppSelector(state => state.video.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="video-heading" data-cy="VideoHeading">
        <Translate contentKey="appBiomedicaleApp.video.home.title">Videos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appBiomedicaleApp.video.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/video/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appBiomedicaleApp.video.home.createLabel">Create new Video</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {videoList && videoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="appBiomedicaleApp.video.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.video.nom">Nom</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.video.url">Url</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.video.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.video.duree">Duree</Translate>
                </th>
                <th>
                  <Translate contentKey="appBiomedicaleApp.video.patients">Patients</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {videoList.map((video, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/video/${video.id}`} color="link" size="sm">
                      {video.id}
                    </Button>
                  </td>
                  <td>{video.nom}</td>
                  <td>{video.url}</td>
                  <td>{video.date ? <TextFormat type="date" value={video.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{video.duree}</td>
                  <td>{video.patients ? <Link to={`/patient/${video.patients.id}`}>{video.patients.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/video/${video.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/video/${video.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/video/${video.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="appBiomedicaleApp.video.home.notFound">No Videos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Video;
