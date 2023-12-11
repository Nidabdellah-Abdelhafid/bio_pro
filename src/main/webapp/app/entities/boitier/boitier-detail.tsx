import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './boitier.reducer';
import { getEntities } from 'app/entities/boitier-capteur/boitier-capteur.reducer';
import { Card, Carousel } from 'react-bootstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
interface BoitierDetailProps {
  boitierEntityy: any;
}

export const BoitierDetail: React.FC<BoitierDetailProps> = ({ boitierEntityy }) => {
const dispatch = useAppDispatch();
const { id } = useParams<{ id: string }>();
const boitierEntity = useAppSelector(state => state.boitier.entity);
const boitierCapteurList = useAppSelector(state => state.boitierCapteur.entities);

let i=0;

useEffect(() => {
  if (id) {
    dispatch(getEntity(id));
  }
  dispatch(getEntities({}));
}, [id]);

  return (
    <div>
{ boitierEntityy && typeof boitierEntityy.id !== 'undefined'? (
  <Row className="justify-content-center">
        <Col md="8">
          <h2 data-cy="boitierDetailsHeading">
            <Translate contentKey="appBiomedicaleApp.boitier.detail.title">Boitier</Translate>
          </h2>
          <div className="d-flex mb-4">
            <Col md="6" className="justify-content-center align-items-center">
              <Card className="mt-4">
                <Card.Body>
                  <dl className="jh-entity-details">
                    <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
                    </dt>
                    <dd>{boitierEntityy.id}</dd>
                    <dt>
            <span id="type">
              <Translate contentKey="appBiomedicaleApp.boitier.type">Type</Translate>
            </span>
                    </dt>
                    <dd>{boitierEntityy.type}</dd>
                    <dt>
            <span id="ref">
              <Translate contentKey="appBiomedicaleApp.boitier.ref">Ref</Translate>
            </span>
                    </dt>
                    <dd>{boitierEntityy.ref}</dd>
                    <dt>
            <span id="nbrBranche">
              <Translate contentKey="appBiomedicaleApp.boitier.nbrBranche">Nbr Branche</Translate>
            </span>
                    </dt>
                    <dd>{boitierEntityy.nbrBranche}</dd>
                  </dl>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6" className="mx-3">
              <div className="justify-content-center align-items-center text-center"><span >Nomber of Capteurs is {boitierEntityy && boitierEntityy.type && (
                boitierCapteurList.length > 0 ? (
                  boitierCapteurList.map(otherEntity => {
                    if (boitierEntityy && boitierEntityy.id && otherEntity.boitiers && otherEntity.boitiers.id && boitierEntityy.id === otherEntity.boitiers.id) {
                        i+=1
                    }
                    return null;
                  })
                ) : (
                    <span>not found</span>
                )
              )}
                {i}
              </span></div>

              <Carousel prevLabel="" nextLabel="">
                {boitierEntityy && boitierEntityy.type && (
                  boitierCapteurList.length > 0 ? (
                    boitierCapteurList.map(otherEntity => {
                      if (boitierEntityy && boitierEntityy.id && otherEntity.boitiers && otherEntity.boitiers.id && boitierEntityy.id === otherEntity.boitiers.id) {

                        return (
                          <Carousel.Item key={otherEntity.id}>

                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                <div className="card-body text-center">
                                  {otherEntity.capteurs.photo ? (
                                    <div>
                                      {otherEntity.capteurs.photoContentType ? (
                                        <a onClick={() => openFile(otherEntity.capteurs.photoContentType, otherEntity.capteurs.photo)}>
                                          <img src={`data:${otherEntity.capteurs.photoContentType};base64,${otherEntity.capteurs.photo}`} style={{ height: '150px', width: '200px' }} />
                                        </a>
                                      ) : null}
                                    </div>
                                  ) : null}
                                  <div>Type: {otherEntity.capteurs.type}</div>
                                  <div>Reference: {otherEntity.capteurs.reference}</div>
                                  <div>Resolution: {otherEntity.capteurs.resolution}</div>
                                  <div>Branche: {otherEntity.branche}</div>
                                </div>
                            </div>
                          </Carousel.Item>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <Carousel.Item key="not-found">
                      <span>not found</span>
                    </Carousel.Item>
                  )
                )}
              </Carousel>



            </Col></div>
        </Col>
      </Row>
                ) : (

      <Row className="justify-content-center">
        <Col md="8">
          <h2 data-cy="boitierDetailsHeading">
            <Translate contentKey="appBiomedicaleApp.boitier.detail.title">Boitier</Translate>
          </h2>
          <div className="d-flex mb-4">
            <Col md="6" className="justify-content-center align-items-center">
              <Card className="mt-4">
                <Card.Body>
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
                  </dl>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6" className="mx-3">
              <div className="justify-content-center align-items-center text-center"><span >Nomber of Capteurs is {boitierEntity && boitierEntity.type && (
                boitierCapteurList.length > 0 ? (
                  boitierCapteurList.map(otherEntity => {
                    if (boitierEntity && boitierEntity.id && otherEntity.boitiers && otherEntity.boitiers.id && boitierEntity.id === otherEntity.boitiers.id) {
                        i+=1
                    }
                    return null;
                  })
                ) : (
                    <span>not found</span>
                )
              )}
                {i}
              </span></div>

              <Carousel prevLabel="" nextLabel="">
                {boitierEntity && boitierEntity.type && (
                  boitierCapteurList.length > 0 ? (
                    boitierCapteurList.map(otherEntity => {
                      if (boitierEntity && boitierEntity.id && otherEntity.boitiers && otherEntity.boitiers.id && boitierEntity.id === otherEntity.boitiers.id) {

                        return (
                          <Carousel.Item key={otherEntity.id}>

                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                <div className="card-body text-center">
                                  {otherEntity.capteurs.photo ? (
                                    <div>
                                      {otherEntity.capteurs.photoContentType ? (
                                        <a onClick={() => openFile(otherEntity.capteurs.photoContentType, otherEntity.capteurs.photo)}>
                                          <img src={`data:${otherEntity.capteurs.photoContentType};base64,${otherEntity.capteurs.photo}`} style={{ height: '150px', width: '200px' }} />
                                        </a>
                                      ) : null}
                                    </div>
                                  ) : null}
                                  <div>Type: {otherEntity.capteurs.type}</div>
                                  <div>Reference: {otherEntity.capteurs.reference}</div>
                                  <div>Resolution: {otherEntity.capteurs.resolution}</div>
                                  <div>Branche: {otherEntity.branche}</div>
                                </div>
                            </div>
                          </Carousel.Item>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <Carousel.Item key="not-found">
                      <span>not found</span>
                    </Carousel.Item>
                  )
                )}
              </Carousel>



            </Col></div>
          <Button tag={Link} to="/boitier" replace color="info" data-cy="entityDetailsBackButton">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
          </Button>

          <Button tag={Link} to={`/boitier/${boitierEntity.id}/edit`} replace color="primary" className="mx-3">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
          </Button>
        </Col>
      </Row>

    )
  }
</div>
  );
};

export default BoitierDetail;
