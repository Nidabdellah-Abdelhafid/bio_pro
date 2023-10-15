import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './boitier.reducer';
import { getEntities } from 'app/entities/boitier-capteur/boitier-capteur.reducer';

export const BoitierDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const boitierEntity = useAppSelector(state => state.boitier.entity);
  const boitierCapteurList = useAppSelector(state => state.boitierCapteur.entities);

  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getEntities({}));
  }, []);

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="boitierDetailsHeading">
          <Translate contentKey="appBiomedicaleApp.boitier.detail.title">Boitier</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{boitierEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="appBiomedicaleApp.boitier.type">Type</Translate>
            </span>
          </dt>
          <dd>{boitierEntity.type}</dd>
          <dt>
            <span id="ref">
              <Translate contentKey="appBiomedicaleApp.boitier.ref">Ref</Translate>
            </span>
          </dt>
          <dd>{boitierEntity.ref}</dd>
          <dt>
            <span id="nbrBranche">
              <Translate contentKey="appBiomedicaleApp.boitier.nbrBranche">Nbr Branche</Translate>
            </span>
          </dt>
          <dd>{boitierEntity.nbrBranche}</dd>
          <dt>
        <span id="capteurs">
          ses capteurs
        </span>
    </dt>
    {boitierEntity && boitierEntity.type && (
        boitierCapteurList.length > 0 ? (
          boitierCapteurList.map(otherEntity => {
            if (boitierEntity.id === otherEntity.boitiers.id) {
              return (
                <Carousel showArrows={true} key={otherEntity.capteurs.id}>
                <div >
                  <div>{otherEntity.capteurs.type}</div>
                </div>
                <div >
                  <div>{otherEntity.capteurs.resolution}</div>
                </div>
              </Carousel>

              );
            }
            return null;
          })
        ) : (
          <span key="not-found">not found</span>
        ))}


        </dl>

        <Button tag={Link} to="/boitier" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/boitier/${boitierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BoitierDetail;
