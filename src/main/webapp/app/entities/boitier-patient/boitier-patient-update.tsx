import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import {isNumber, openFile, Translate, translate, ValidatedField, ValidatedForm} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBoitier } from 'app/shared/model/boitier.model';
import { getEntities as getBoitiers } from 'app/entities/boitier/boitier.reducer';
import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import { IBoitierPatient } from 'app/shared/model/boitier-patient.model';
import { getEntity, updateEntity, createEntity, reset } from './boitier-patient.reducer';
import { getEntities as getEntitiesMedecinPatient } from 'app/entities/medecin-patient/medecin-patient.reducer';
import{ getEntities as getEntitiesExtraUser } from 'app/entities/extra-user/extra-user.reducer';
import{ getEntities as getEntitiesMedecin } from 'app/entities/medecin/medecin.reducer';
import { getEntities as getEntitiesBoitiersPatients } from './boitier-patient.reducer';
import { getEntities as getBoitiersCapteurs } from 'app/entities/boitier-capteur/boitier-capteur.reducer';
import { getEntities as getCapteurs } from 'app/entities/capteur/capteur.reducer';
import ExtraUser from '../extra-user/extra-user';
import { IMedecinPatient } from 'app/shared/model/medecin-patient.model';
import { IBoitierCapteur } from 'app/shared/model/boitier-capteur.model';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
interface BoitierPatientUpdateProps {
  selectedPatient: any;
}

export const BoitierPatientUpdate: React.FC<BoitierPatientUpdateProps> = ({ selectedPatient }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const account = useAppSelector(state => state.authentication.account);
  const boitiers = useAppSelector(state => state.boitier.entities);
  const patients = useAppSelector(state => state.patient.entities);
  const userextra = useAppSelector(state => state.extraUser.entities);
  const boitierPatientEntity = useAppSelector(state => state.boitierPatient.entity);
  const loading = useAppSelector(state => state.boitierPatient.loading);
  const updating = useAppSelector(state => state.boitierPatient.updating);
  const updateSuccess = useAppSelector(state => state.boitierPatient.updateSuccess);
  const [listePatients, setListePatients] = useState<IMedecinPatient[]>([]);
  const [listePatientsBoitiers, setListePatientsBoitiers] = useState<IBoitier[]>([]);
  const [boitierCapteurList,setBoitierCapteursList] = useState<IBoitierCapteur[]>([]);
  const boitiersCapteurs = boitierCapteurList.length > 0 ? boitierCapteurList[0].boitiers.type : null;

  let i=0;
  let [item,setItem]=useState(0);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const handleClose = () => {
    navigate('/boitier-patient');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
    dispatch(getBoitiers({}));
    dispatch(getPatients({}));
    RecupererListPatient1();
    RecupererListPatient();

  }, []);

  const handleBoitierSelection = async (event) => {
    const boitierCapteur = await dispatch(getBoitiersCapteurs({}))
    const boitierCapteurData = boitierCapteur.payload["data"];
    const boitierId = event.target.value;
    const filteredCapteurList = boitierCapteurData.filter(otherEntity =>
      otherEntity.boitiers.id === parseInt(boitierId)
    );
    setBoitierCapteursList(filteredCapteurList);
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const RecupererListPatient1 = async () => {
    const boitie = await dispatch(getBoitiers({}));
    const boitierpatient = await dispatch(getEntitiesBoitiersPatients({}));
    const boitierss = boitie.payload["data"];
    const elements = boitierpatient.payload["data"];
    let newListePatientsBoitiers: IBoitier[] = [];
    for (const c of boitierss) {
      let isNotEnded = true;
      for (const element of elements) {
        if (c && c.id && element && element.boitiers && c.id === element.boitiers.id) {
          if (element.dateFin === '0001-01-01' && element.patients && element.patients.id === selectedPatient.id) {
            isNotEnded = false;
            break;
          }
        }
      }
      if (isNotEnded) {
        newListePatientsBoitiers.push(c);
      }
    }
    setListePatientsBoitiers(newListePatientsBoitiers);
  };

  const saveEntity = async values => {
    const currentDate = new Date();
    const formattedDateDebut = currentDate.toISOString().split('T')[0];
    const boitierPatientEntities = await dispatch(getEntitiesBoitiersPatients({}));
    let patientHasBoitier = false;
    let BoitierExist = false;
    let existingBoitierPatientId = null;
    let existingBoitierPatientId1 = null;
    for (const boitierPatient of boitierPatientEntities.payload["data"]) {
      if (boitierPatient.patients.id === selectedPatient.id  && boitierPatient.dateFin === '0001-01-01' ) {
        patientHasBoitier = true;
        existingBoitierPatientId = boitierPatient;
      }
      if (boitierPatient.boitiers.id === parseInt(values.boitiers.toString()) && boitierPatient.dateFin === '0001-01-01' ) {
        BoitierExist = true;
        existingBoitierPatientId1 = boitierPatient;
      }
    }
    if (BoitierExist) {
      const updatedEntity = {
        id: existingBoitierPatientId1.id,
        dateDebut: existingBoitierPatientId1.dateDebut,
        dateFin: formattedDateDebut,
        boitiers: existingBoitierPatientId1.boitiers,
        patients: existingBoitierPatientId1.patients,
      };
      dispatch(updateEntity(updatedEntity))
    }
    if (patientHasBoitier) {
      const updatedEntity = {
        id: existingBoitierPatientId.id,
        dateDebut: existingBoitierPatientId.dateDebut,
        dateFin: formattedDateDebut,
        boitiers: existingBoitierPatientId.boitiers,
        patients: existingBoitierPatientId.patients,
      };
      dispatch(updateEntity(updatedEntity));
      const newEntity = {
        dateDebut: formattedDateDebut,
        dateFin: '0001-01-01',
        boitiers: boitiers.find(it => it.id.toString() === values.boitiers.toString()),
        patients: selectedPatient,
      };
      dispatch(createEntity(newEntity));
    } else {
      const newEntity = {
        dateDebut: formattedDateDebut,
        dateFin: '0001-01-01',
        boitiers: boitiers.find(it => it.id.toString() === values.boitiers.toString()),
        patients: selectedPatient,
      };
      dispatch(createEntity(newEntity));
    }

    navigate('/boitier-patient');

  };

  const RecupererListPatient = async () => {
    const liste = await dispatch(getEntitiesMedecinPatient({}));
    const extraUser = await dispatch(getEntitiesExtraUser({}))
    const medecinrecuperer = await dispatch(getEntitiesMedecin({}))
    const matchingUserExtra = extraUser.payload["data"].find((extra) => extra.user.id === account.id);
    const medecinVoulu = medecinrecuperer.payload["data"].find((item) => item.extraUserId.id === matchingUserExtra.id);
    setListePatients(liste.payload["data"].filter((item) => item.medecins.id === medecinVoulu.id && item.dateFin === '0001-01-01'));

  };
  const defaultValues = () =>
    isNew
      ? {}
      : {
        ...boitierPatientEntity,
        boitiers: boitierPatientEntity?.boitiers?.id,
        patients: boitierPatientEntity?.patients?.id,
      };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h4 id="appBiomedicaleApp.boitierPatient.home.createOrEditLabel" data-cy="BoitierPatientCreateUpdateHeading">
            Choisir un boitier
          </h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="boitier-patient-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                id="boitier-patient-boitiers"
                name="boitiers"
                data-cy="boitiers"
                label={translate('appBiomedicaleApp.boitierPatient.boitiers')}
                type="select"
                onChange={handleBoitierSelection}
              >
                <option value="" key="0" />
                {listePatientsBoitiers
                  ? listePatientsBoitiers.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.ref}
                    </option>
                  ))
                  : null}
              </ValidatedField>
              {boitierCapteurList.length > 0 && (
                <div className="mb-3">
                  {boitiersCapteurs && (
                    <h6 className="card-title">Le Boitier :  {boitiersCapteurs}</h6>
                  )}
                  <h6>
                    Les capteurs associés au boîtier sélectionné :</h6>

                  <Carousel responsive={responsive}
                            swipeable={true}
                            ssr={true}
                            containerClass="carousel-container"
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-100-px"
                  >

                    {boitierCapteurList.map((element, index) => (
                      <div key={index}>
                        <div className="" style={{ width: '10rem', height:'20rem', boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)', maxWidth:'320px', margin:' 1rem', textAlign:'center', padding: '2rem' }}>
                          {element.capteurs.photo ? (
                            <div>
                              {element.capteurs.photoContentType ? (
                                <a onClick={openFile(element.capteurs.photoContentType, element.capteurs.photo)}>
                                  <img src={`data:${element.capteurs.photoContentType};base64,${element.capteurs.photo}`} className="card-img-top" alt="..." style={{ width: '100%', height: '8em', objectFit:'cover' }}/>
                                </a>
                              ) : null}
                            </div>
                          ) : null}

                          <div className="card-body">
                            <h6 className="card-title">{element.capteurs.type}</h6>
                            <br/>
                            <p className="card-text">{element.capteurs.reference}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}

              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BoitierPatientUpdate;
