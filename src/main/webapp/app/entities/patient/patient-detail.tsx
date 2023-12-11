import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Breadcrumb, Card, ListGroup, ProgressBar, Image } from 'react-bootstrap';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './patient.reducer';
import {getEntities as getExtraUsers} from "app/entities/extra-user/extra-user.reducer";
import {getUsers} from "app/modules/administration/user-management/user-management.reducer";

export const PatientDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getExtraUsers({}));
    dispatch(getUsers({}));
  }, []);
  const medecinPatientEnttity = useAppSelector(state => state.medecinPatient.entities);
  const medecinList = useAppSelector(state => state.medecin.entities);
  const patientList = useAppSelector(state => state.patient.entities);
  const userextra = useAppSelector(state => state.extraUser.entities);
  const user = useAppSelector(state => state.userManagement.user);

  const patientEntity = useAppSelector(state => state.patient.entity);
  // Utilize map to create a list patientWithMedecinIdList

  // Find the corresponding medecinPatient based on the patient's id
  const matchingMedecinPatient = medecinPatientEnttity.find(medecinpatient => medecinpatient.patients.id === patientEntity.id && medecinpatient.dateFin === '0001-01-01');

  // Initialize extra user's name to "N/A"
  let medecinName = "N/A";
  let extraNamee = "N/A";
  let email = "N/A";
  let photo1 = "N"; // Initialisez avec "N" par défaut
  let photo2 = "N"; // Initialisez avec "N" par défaut

  // If a matching medecinPatient is found, look up the extra user's name in userextra
  if (matchingMedecinPatient) {
    const matchingMedecin = medecinList.find((medecin) => medecin.id === matchingMedecinPatient.medecins.id);
    if (matchingMedecin) {
      const matchingextra = userextra.find((extra) => extra.id === matchingMedecin.extraUserId.id);
      if (matchingextra) {
        medecinName = `${matchingextra.user.lastName} ${matchingextra.user.firstName}`;

        email = matchingextra.user.email;
        dispatch(getExtraUsers({}));
        dispatch(getUsers({}));
      }
    }
  }

  let cin1 = "N/A";
  let email1 = "N/A";
  let datenaissance1 = "N/A";
  let nationalite1 = "N";
  let adresse1 = "N";
  let genre1 = "N";
  let numerotelephone1 = "N";

  //affichage patient
  const matchingPatient = patientList.find((patient) => patient.id === patientEntity.id);
  if (matchingPatient) {
    const matchingextra = userextra.find((extra) => extra.id ===matchingPatient.extraUserId.id);
    if (matchingextra) {
      extraNamee = `${matchingextra.user.lastName} ${matchingextra.user.firstName}`;

      cin1 = matchingextra.cin;
      email1 = matchingextra.user.email;
      numerotelephone1 = matchingextra.numeroTelephone;
      datenaissance1 = matchingextra.dateNaissance;
      nationalite1 = matchingextra.nationalite;
      adresse1 = matchingextra.adresse;
      genre1 = matchingextra.genre;
      photo1 = matchingextra.photo;
      photo2 = matchingextra.photoContentType;
    }
  }


  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Container className="py-5">
        <Row>
          <Col>
            <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
              <Breadcrumb.Item>
                <a href="#"></a>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Patient Profile</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            <Card className="mb-2">
              <Card.Body className="text-center">
                <Image
                  src={`data:${photo2};base64,${photo1}`}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '180px' }}
                  fluid
                />
                <p className="text-muted mb-1">{extraNamee}</p>
                <p className="font-italic mb-4">{patientEntity.profession}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button tag={Link} to="/patient" replace color="info" data-cy="entityDetailsBackButton">
                    <FontAwesomeIcon icon="arrow-left" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.back">Back</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`/patient/${patientEntity.id}/edit`} replace color="primary">
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
                <Card.Text className="mb-0"><span className="text-primary font-italic me-1">Medecin Name</span> {medecinName}</Card.Text>

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
                    <Card.Text className="text-muted">{extraNamee}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Cin</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{cin1}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>

                  <Col sm="3">
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{email1}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{numerotelephone1}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Nationalite</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{nationalite1}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Address</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{adresse1}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Date Naissance</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{datenaissance1}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Genre</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{genre1}</Card.Text>
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

export default PatientDetail;
