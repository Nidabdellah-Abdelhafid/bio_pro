import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { getEntities as getExtraUsers } from 'app/entities/extra-user/extra-user.reducer';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './medecin.reducer';
import {getUsers} from "app/modules/administration/user-management/user-management.reducer";

import { Container, Breadcrumb, Card, ListGroup, ProgressBar, Image } from 'react-bootstrap';
export const MedecinDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  const medecinEntity = useAppSelector(state => state.medecin.entity);
  const userextra = useAppSelector(state => state.extraUser.entities);
  const user = useAppSelector(state => state.userManagement.user);
  const [nomMedecin, setNomMedecin] = useState('');
  const [emaill, setEmaill] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [adress, setAdress] = useState('');
  const [photo, setPhoto] = useState('');
  const [photo_2, setPhoto_2] = useState('');
  const [phone, setPhone] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [genre, setGenre] = useState('');
  const [cin, setCin] = useState('');


  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getExtraUsers({}));
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    dispatch(getExtraUsers({}));
    dispatch(getUsers({}));
    // Effect to fetch the name of the medecin when the entity changes
    if (medecinEntity.extraUserId) {
      const matchingExtra = userextra.find(extra => extra.id === medecinEntity.extraUserId.id);
      if (matchingExtra) {
        const medecinName = `${matchingExtra.user.lastName} ${matchingExtra.user.firstName}`;
        const emailll = matchingExtra.user.email;
        const nationalitte = matchingExtra.nationalite;
        const addresse = matchingExtra.nationalite;
        const cinn = matchingExtra.cin;
        const  photo1=matchingExtra.photo;
        const  photo2=matchingExtra.photoContentType;
        const  phonee=matchingExtra.numeroTelephone;
        const  dateNaissancee=matchingExtra.dateNaissance;
        const  genree=matchingExtra.genre;
        setNomMedecin(medecinName);
        setEmaill(emailll);
        setNationalite(nationalitte);
        setAdress(addresse);
        setCin(cinn);
        setPhoto(photo1);
        setPhoto_2(photo2);
        setPhone(phonee);
        setDateNaissance(dateNaissancee);
        setGenre(genree);
      }
    }
  }, [medecinEntity, userextra]);

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container className="py-5">
        <Row>
          <Col>
            <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
              <Breadcrumb.Item>
                <a href="#"></a>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Medecin Profile</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            <Card className="mb-2">
              <Card.Body className="text-center">
                <Image
                  src={`data:${photo_2};base64,${photo}`}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '180px' }}
                  fluid
                />
                <p className="text-muted mb-1">{nomMedecin}</p>
                <p className="font-italic mb-4">{medecinEntity.specialite}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button tag={Link} to="/medecin" replace color="info" data-cy="entityDetailsBackButton">
                    <FontAwesomeIcon icon="arrow-left" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.back">Back</Translate>
                    </span>
                  </Button>
                  &nbsp;
                  <Button tag={Link} to={`/medecin/${medecinEntity.id}/edit`} replace color="primary">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                      </span>
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">

              </Card.Body>
            </Card>

          </Col>
          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text>Full Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{nomMedecin}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Cin</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{cin}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>

                  <Col sm="3">
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{emaill}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{phone}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Nationalite</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{nationalite}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Address</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{adress}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Date Naissance</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{dateNaissance}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Genre</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{genre}</Card.Text>
                  </Col>
                </Row>

              </Card.Body>
            </Card>

            <Row>



            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MedecinDetail;
