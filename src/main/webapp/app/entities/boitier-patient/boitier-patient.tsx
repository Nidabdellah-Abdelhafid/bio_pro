import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable, { createTheme, Theme } from 'react-data-table-component';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Col,Row } from 'reactstrap'; // Importez le composant Modal
import { Translate, TextFormat, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IBoitierPatient } from 'app/shared/model/boitier-patient.model';
import { IBoitierCapteur } from 'app/shared/model/boitier-capteur.model';
import { getEntities as getEntitiesBoitiersPatients } from './boitier-patient.reducer';
import { getEntities as getEntitiesMedecinPatient } from 'app/entities/medecin-patient/medecin-patient.reducer';
import { getEntities as getEntitiesExtraUser } from 'app/entities/extra-user/extra-user.reducer';
import { getEntities as getEntitiesMedecin } from 'app/entities/medecin/medecin.reducer';
import { IMedecinPatient } from 'app/shared/model/medecin-patient.model';
import { IBoitier } from 'app/shared/model/boitier.model';
import { getEntities as getBoitiers } from 'app/entities/boitier/boitier.reducer';
import { IPatient } from 'app/shared/model/patient.model';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import BoitierPatientUpdate from './boitier-patient-update';
import BoitierDetail from '../boitier/boitier-detail';
import { getUser, getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getExtraUsers } from 'app/entities/extra-user/extra-user.reducer';
import { IExtraUser } from 'app/shared/model/extra-user.model';
import WebSocketClient from './WebSocketClient'
import { getEntities as getBoitiersCapteurs } from 'app/entities/boitier-capteur/boitier-capteur.reducer';
import { ICapteur } from "app/shared/model/capteur.model";

import { IUser } from 'app/shared/model/user.model';
const CodeModal = ({  patient, nombrecapteur, capteurs, isOpen, toggle }) => {
  // Include your code or component for displaying data here
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>Viewing Data</ModalHeader>
      <ModalBody>
        <WebSocketClient serverAddress="localhost" port={2222} Patient={patient} capteurs={capteurs} isCodeModalOpen={isOpen} nombre={nombrecapteur} />

      </ModalBody>
    </Modal>
  );
};

const BoitierDetailModal = ({ boitier, isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Detail Boitier</ModalHeader>
      <ModalBody>
        <BoitierDetail boitierEntityy={boitier} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Fermer
        </Button>
      </ModalFooter>
    </Modal>

  );
};
export const BoitierPatient = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.authentication.account);
  const loading = useAppSelector((state) => state.boitierPatient.loading);
  const [listePatients, setListePatients] = useState<IMedecinPatient[]>([]);
  const [listePatientsBoitiers, setListePatientsBoitiers] = useState<IBoitierPatient[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [selectedBoitier, setSelectedBoitier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userextras,setUserextras] = useState<IExtraUser[]>([]);
  const users = useAppSelector(state => state.userManagement.users);
  const userextra = useAppSelector(state => state.extraUser.entities);
  const patientss = useAppSelector(state => state.patient.entities);
  const [boitierCapteurList,setBoitierCapteursList] = useState<IBoitierCapteur[]>([]);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isReaffecterButton, setIsReaffecterButton] = useState(true);
  const [patient,setPatient] = useState({});
  const [nombreCapteur,setNombreCapteur] = useState(0);
  const [capteurs,setCapteurs] = useState<IBoitierCapteur[]>([]);

// Add a new state for the search term
  const [searchTerm, setSearchTerm] = useState('');
  const customStyles = {
    headRow: {
      style: {
        fontSize: '16px',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
      },
      sortIcon: {
        color: '#000', // Couleur de l'icône de tri
      },
    },
    pagination: {
      style: {
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'center',  // Centrer la pagination horizontalement
        alignItems: 'center',      // Centrer la pagination verticalement
        listStyle: 'none',
        padding: '10px',
      },
    },
    paginationButton: {
      style: {
        margin: '0 5px',  // Espacement entre les boutons de pagination
        cursor: 'pointer',
        borderRadius: '5px',
        padding: '5px 10px',
        backgroundColor: '#e0e0e0',  // Couleur de fond des boutons de pagination
      },
      page: {
        style: {
          color: '#000',  // Couleur du texte de la page
        },
        active: {
          style: {
            backgroundColor: '#007bff',  // Couleur de fond de la page active
            color: '#fff',  // Couleur du texte de la page active
          },
        },
      },
      disabled: {
        style: {
          color: '#ccc',  // Couleur du texte des boutons de pagination désactivés
          cursor: 'not-allowed',
        },
      },
    },
    customSearchContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '10px', // Ajustez la marge selon vos préférences
    },

    customSearchInput: {
      fontSize: '14px',
      padding: '10px',
      // Ajoutez d'autres styles si nécessaire
    },
  };

// Update the handleSearch function
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
  };

// Use the original list and apply the filter when rendering
  const filteredPatients = listePatients.filter((row) => {
    const patientFullName =
      userextras.find((userExtra) => userExtra.id === patientss.find((p) => p.id === row.patients.id).extraUserId.id)!.user!.firstName +
      ' ' +
      userextras.find((userExtra) => userExtra.id === patientss.find((p) => p.id === row.patients.id).extraUserId.id)!.user!.lastName;

    const formattedDate = new Date(row.dateDebut).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return (
      patientFullName.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm) ||
      row.dateDebut.includes(searchTerm)
    );
  });


  useEffect(() => {
    dispatch(getUsers({}))
    dispatch(getEntitiesExtraUser({}))
    dispatch(getPatients({}))
    RecupererListPatient();

  }, []);

  const handleSyncList = () => {
    console.log('fat');
  };

  const handleClose = () => {
    setModal(!modal);
    window.location.reload();
  };

  const handleBoitierDetail = async (boitier) => {
    const boitierpatient = await dispatch(getEntitiesBoitiersPatients({}));
    const filteredBoitier = boitierpatient.payload["data"].find(item => item.patients.id === boitier.id && item.dateFin === '0001-01-01');
    if (filteredBoitier) {
      setSelectedBoitier(filteredBoitier.boitiers);
      const filteredCapteurList = boitierCapteurList.filter(otherEntity =>
        otherEntity.boitiers.id === filteredBoitier.boitiers.id
      );
      setBoitierCapteursList(filteredCapteurList);
      setIsModalOpen(true);
    }
  };
  const doneestempsreel = async (patient) => {
    const boitierpatient = await dispatch(getEntitiesBoitiersPatients({}));
    const boitiercapteur = await dispatch(getBoitiersCapteurs({}));
    const filteredBoitier = boitierpatient.payload["data"].find(item => item.patients.id === patient.id && item.dateFin === '0001-01-01');
    const filteredcapteurs = boitiercapteur.payload["data"].filter(item => item.boitiers.id === filteredBoitier.boitiers.id);
    if (filteredBoitier) {
      setIsCodeModalOpen(true);
      setPatient(patient)
      setNombreCapteur(filteredcapteurs.length)
      setCapteurs(filteredcapteurs)
      console.log("hnaaa "+ boitiercapteur.payload["data"].filter(item => item.boitiers.id === filteredBoitier.boitiers.id)[0].capteurs.id)

    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const sortFunctions = {
    dateSort: (a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime(),
    patientsSort: (a, b) => {
      const nameA =
        userextras.find((userExtra) => userExtra.id === patientss.find((p) => p.id === a.patients.id).extraUserId.id)!.user!.firstName +
        ' ' +
        userextras.find((userExtra) => userExtra.id === patientss.find((p) => p.id === a.patients.id).extraUserId.id)!.user!.lastName;

      const nameB =
        userextras.find((userExtra) => userExtra.id === patientss.find((p) => p.id === b.patients.id).extraUserId.id)!.user!.firstName +
        ' ' +
        userextras.find((userExtra) => userExtra.id === patientss.find((p) => p.id === b.patients.id).extraUserId.id)!.user!.lastName;

      return nameA.localeCompare(nameB);
    },
  };

  const toggleActive = (patient) => () => {
    dispatch(getBoitiers({}));
    dispatch(getPatients({}));
    setSelectedPatient(patient);
    setModal(!modal);
  };

  const RecupererListPatient = async () => {
    const boitierpatient = await dispatch(getEntitiesBoitiersPatients({}));
    const liste = await dispatch(getEntitiesMedecinPatient({}));
    const extraUser = await dispatch(getEntitiesExtraUser({}));
    const medecinrecuperer = await dispatch(getEntitiesMedecin({}));
    const matchingUserExtra = extraUser.payload["data"].find((extra) => extra.user.id === account.id);
    const medecinVoulu = medecinrecuperer.payload["data"].find((item) => item.extraUserId.id === matchingUserExtra?.id);
    if (medecinVoulu) {
      setListePatients(liste.payload["data"].filter((item) => item.medecins.id === medecinVoulu.id && item.dateFin === '0001-01-01'));
    }
    if (boitierpatient.payload["data"]) {
      setListePatientsBoitiers(boitierpatient.payload["data"].filter((item) => item.dateFin !== null));
      setUserextras(extraUser.payload["data"]);
    }

  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggleActive} size="lg" >
        <ModalHeader toggle={toggleActive}>Affecter un boitier </ModalHeader>
        <ModalBody>
          <BoitierPatientUpdate selectedPatient={selectedPatient} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>

      <h2 id="boitier-patient-heading" data-cy="BoitierPatientHeading">
        <Translate contentKey="appBiomedicaleApp.boitierPatient.home.title">Boitier Patients</Translate>
      </h2>
      <div className="table-responsive">
        {listePatients && listePatients.length > 0 ? (
          <DataTable
            columns={[
              {
                name: 'Date',
                cell: (row) => (
                  <p>{row.dateDebut}</p>
                ),
                sortable: true,
                sortFunction: sortFunctions.dateSort,
              },
              {
                name: 'Patients',
                cell: (row) => (
                  <p>
                    {userextras.find((userExtra) => userExtra.id === patientss.find((p) => p.id === row.patients.id).extraUserId.id)!.user!.firstName}{' '}
                    {userextras.find((userExtra) => userExtra.id === patientss.find((p) => p.id === row.patients.id).extraUserId.id)!.user!.lastName}
                  </p>
                ),
                sortable: true,
                sortFunction: sortFunctions.patientsSort,
              },
              {
                name: 'Boitiers',
                cell: (row) => (
                  listePatientsBoitiers.find(
                    (element) => element.patients.id === row.patients.id && element.dateFin === '0001-01-01'
                  ) ? (

                    <Button color="success" onClick={toggleActive(row.patients)}>
                      Reassign
                    </Button>
                  ) : (
                    <Button color="danger" onClick={toggleActive(row.patients)}>
                      Assign
                    </Button>
                  )
                ),
              },
              {
                name: 'View',
                cell: (row) => (
                  <Button color="warning" onClick={() => handleBoitierDetail(row.patients)}>
                    View
                  </Button>
                ),
              },
              {
                name: 'View data',
                cell: (row) => (
                  <Button color="info" onClick={() => doneestempsreel(row.patients)} >
                    View data
                  </Button>
                ),
              },
            ]}
            data={filteredPatients}
            pagination
            subHeader
            paginationRowsPerPageOptions={[5, 10, 30, 40, 50]}  // Options du sélecteur "Rows per page"
            paginationPerPage={4}  // Nombre initial de lignes par page
            subHeaderComponent={
              <div className="d-flex justify-content-start align-items-center mb-3">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <FontAwesomeIcon icon="search" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={handleSearch}
                  />
                </div>
                {/* Vous pouvez ajouter d'autres éléments ici si nécessaire */}
              </div>
            }
            sortIcon={<FontAwesomeIcon icon="sort" />}
            defaultSortAsc={false}
            customStyles={customStyles}

          />
        ) : !loading ? (
          <div className="alert alert-warning">
            <Translate contentKey="appBiomedicaleApp.boitierPatient.home.notFound">No Boitier Patients found</Translate>
          </div>
        ) : null}

      </div>
      { selectedBoitier && (
        <BoitierDetailModal boitier={selectedBoitier} isOpen={isModalOpen} toggle={toggleModal} />
        )}

      <CodeModal patient={patient} nombrecapteur={nombreCapteur} capteurs={capteurs} isOpen={isCodeModalOpen} toggle={() => setIsCodeModalOpen(!isCodeModalOpen)} />


    </div>
  );
};

export default BoitierPatient;
