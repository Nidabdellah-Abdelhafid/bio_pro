import React, { useState, useEffect } from 'react';
import { ButtonGroup, Row } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import {openFile, Translate} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as getEntitiesMedecins } from 'app/entities/medecin/medecin.reducer';
import { getUsers,createUser,getRoles,updateUser } from 'app/modules/administration/user-management/user-management.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getEntitiesMedecinPatient, createEntity as createEntityMedecinPatient, updateEntity as updateEntityMedecinPatient } from 'app/entities/medecin-patient/medecin-patient.reducer';
import{ createEntity as cretaeEntityExtraUser,updateEntity as updateEntityExtraUser } from 'app/entities/extra-user/extra-user.reducer';
import { getEntities as getExtraUsers } from 'app/entities/extra-user/extra-user.reducer';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DataTable, { TableColumn } from 'react-data-table-component';


import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { IPatient } from 'app/shared/model/patient.model';
import { getEntities } from './patient.reducer';
import ExtraUser from '../extra-user/extra-user';
// ... (import statements)

export const Patient = () => {
  const dispatch = useAppDispatch();
  const userextra = useAppSelector(state => state.extraUser.entities);
  const patientList = useAppSelector(state => state.patient.entities);
  const loading = useAppSelector(state => state.patient.loading);
  const medecinPatientEntity = useAppSelector(state => state.medecinPatient.entities);
  const medecinList = useAppSelector(state => state.medecin.entities);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  useEffect(() => {
    dispatch(getExtraUsers({}));
    dispatch(getEntities({}));
    dispatch(getEntitiesMedecins({}));
    dispatch(getEntitiesMedecinPatient({}));
    dispatch(getUsers({}));
  }, []);


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

  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    // Filtrer les données en fonction du terme de recherche dans plusieurs champs
    const filteredPatients = processedPatientList.filter(patient =>
      ['userFirstName', 'userLastName', 'profession', 'datedebut','profession','extraName']
        .some(field => patient[field].toLowerCase().includes(searchTerm.toLowerCase()))
    );

    console.log('searchTerm:', searchTerm);
    console.log('filteredPatients:', filteredPatients);

    setSearchedData(filteredPatients);
  }, [searchTerm]);


  // Data processing logic
  const processedPatientList = patientList.map(patient => {
    let datedebut = "N/A";
    let extraName = "N/A";
    let userFirstName = '';
    let userLastName = '';
    let userExtraData = '';
    let photo = '';

    const matchingMedecinPatient = medecinPatientEntity.find(medecinpatient => medecinpatient.patients.id === patient.id && medecinpatient.dateFin === '0001-01-01');
    if (matchingMedecinPatient) {
      datedebut = matchingMedecinPatient.dateDebut;
      const matchingMedecin = medecinList.find(medecin => medecin.id === matchingMedecinPatient.medecins.id);

      if (matchingMedecin) {
        const matchingExtra = userextra.find(extra => extra.id === matchingMedecin.extraUserId.id);

        if (matchingExtra) {
          extraName = `${matchingExtra.user.lastName} ${matchingExtra.user.firstName}`;
        }
      }

      const userExtraData = userextra.find(userExtra => userExtra.id === patient.extraUserId.id);
      userFirstName = userExtraData ? userExtraData.user!.firstName : '';
      userLastName = userExtraData ? userExtraData.user!.lastName : '';
      photo = userExtraData ? userExtraData.photo : '';
    }

    return {
      ...patient,
      datedebut,
      extraName,
      userFirstName,
      userLastName,
      photo,
    };
  });
  // Data processing logic
// Data processing logic
  const processedPatientListt = patientList.map(patient => {
    const patientData = {
      datedebut: [],
      datefin: [],
      extraName: [],
      photoMedecin: [],
      userFirstName: '',
      userLastName: '',
      photo: '',
    };
    if(patient.id === selectedPatientId) {
      const matchingMedecinPatients = medecinPatientEntity.filter(medecinpatient => medecinpatient.patients.id === patient.id);
      matchingMedecinPatients.forEach(matchingMedecinPatient => {
        const datedebut = matchingMedecinPatient.dateDebut;
        const datefin = matchingMedecinPatient.dateFin;
        const matchingMedecin = medecinList.find(medecin => medecin.id === matchingMedecinPatient.medecins.id);
        if (matchingMedecin) {
          const matchingExtra = userextra.find(extra => extra.id === matchingMedecin.extraUserId.id);
          if (matchingExtra) {
            const extraName = `${matchingExtra.user.lastName} ${matchingExtra.user.firstName}`;
            const photoMedecin = matchingExtra.photo;
            console.log("matchingExtra", matchingExtra);
            if (matchingExtra.user) {
              console.log("photoMedecin", matchingExtra.photo);
            }
            patientData.datedebut.push(datedebut);
            patientData.datefin.push(datefin);
            patientData.extraName.push(extraName);
            patientData.photoMedecin.push(matchingExtra.photo);
          }
        }
      });
      const userExtraData = userextra.find(userExtra => userExtra.id === patient.extraUserId.id);
      patientData.userFirstName = userExtraData ? userExtraData.user!.firstName : '';
      patientData.userLastName = userExtraData ? userExtraData.user!.lastName : '';
      patientData.photo = userExtraData ? userExtraData.photo : '';
    }
    return {
      ...patient,
      ...patientData,
    };
  });



  const handleSyncList = () => {
    dispatch(getEntities({}));
  };
  const columns: TableColumn<any>[] = [
    {
      name: 'ID',
      selector: (row: any) => row.id,
      sortable: true,
      width: '100px', // Ajustez la largeur selon vos besoins
    },
    {
      name: 'Photo',
      selector: (row: any) => row.photo,
      sortable: false,
      cell: row => <img src={`data:${row.photoContentType};base64,${row.photo}`} style={{ maxHeight: '80px', width: '90px' }} alt="Photo" />,
      width: '100px', // Ajustez la largeur selon vos besoins
    },
    {
      name: 'Full Name',
      selector: (row: any) => `${row.userFirstName} ${row.userLastName}`,
      sortable: true,
      width: '160px', // Ajustez la largeur selon vos besoins
    },
    {
      name: 'Profession',
      selector: (row: any) => row.profession,
      sortable: true,
      width: '200px', // Ajustez la largeur selon vos besoins
    },
    {
      name: 'Médecin',
      selector: (row: any) => row.extraName,
      sortable: true,
      width: '160px', // Ajustez la largeur selon vos besoins
    },
    {
      name: 'Date',
      selector: (row: any) => row.datedebut,
      sortable: true,
      width: '200px', // Ajustez la largeur selon vos besoins
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex justify-content-end">
          <ButtonGroup>
            <Button
              tag={Link}
              to={`/patient/${row.id}`}
              color="info"
              size="sm"
              data-cy="entityDetailsButton"
              style={{ width: '50px' }}
            >
              <FontAwesomeIcon icon="eye" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.view">View</Translate>
              </span>
            </Button>
            <Button
              color="secondary"
              size="sm"
              data-cy="detaillePatientMedecinButton"
              onClick={() => {
                setSelectedPatientId(row.id);
                toggleModal();
              }}
              style={{ width: '70px' }}
            >
              <FontAwesomeIcon icon={faHistory} />{' '}
              History
            </Button>
            <Button
              tag={Link}
              to={`/patient/${row.id}/edit`}
              color="primary"
              size="sm"
              data-cy="entityEditButton"
              style={{ width: '50px' }}
            >
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
            <Button
              tag={Link}
              to={`/patient/${row.id}/delete`}
              color="danger"
              size="sm"
              data-cy="entityDeleteButton"
              style={{ width: '60px' }}
            >
              <FontAwesomeIcon icon="trash" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.delete">Delete</Translate>
              </span>
            </Button>
          </ButtonGroup>
        </div>
      ),
    },
  ];


  return (
    <div>
      <h2 id="patient-heading" data-cy="PatientHeading">
        <Translate contentKey="appBiomedicaleApp.patient.home.title">Patients</Translate>

        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appBiomedicaleApp.patient.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/patient/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appBiomedicaleApp.patient.home.createLabel">Create new Patient</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {processedPatientList && processedPatientList.length > 0 ? (
          <tbody>
          {processedPatientList.map((patient, i) => (

            <td className="text-end">
              <div className="btn-group flex-btn-group-container">




              </div>
            </td>

          ))}
          </tbody>

        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="appBiomedicaleApp.patient.home.notFound">No Patients found</Translate>
            </div>
          )
        )}

      </div>
      {selectedPatientId && (
        <Modal isOpen={modalIsOpen} toggle={toggleModal} size="lg">
          <ModalHeader >Historique</ModalHeader>
          <ModalBody>
            <div className="data-table-wrapper">
              <table id="medecinDataTable" className="table">
                <thead>
                <tr>
                  <th>Photo</th>
                  <th>Medecin</th>
                  <th>Date</th>
                  <th>Date fin</th>
                </tr>
                </thead>
                <tbody>
                {/* Insérez ici le contenu du tableau avec les données des patients, médecins et dates */}
                {processedPatientListt
                  .filter(patient => patient.id === selectedPatientId)
                  .map((patient, i) => (
                    patient.extraName
                      .map((medecin, j) => (
                        <tr key={i * patient.extraName.length + j}>
                          <td>
                            {patient.photoMedecin[j] && (
                              <img
                                src={`data:${patient.photoContentType};base64,${patient.photoMedecin[j]}`}
                                style={{ maxHeight: '50px', width: '50px' }}
                                alt="PhotoMedecin"
                              />
                            )}
                          </td>
                          <td>Dr. {medecin}</td>
                          <td>{patient.datedebut[j]}</td>
                          <td>{patient.datefin[j] === '0001-01-01' ? '---' : patient.datefin[j]}</td>
                        </tr>
                      ))
                      .reverse() // Inverser l'ordre des lignes
                  ))}

                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>
      )}


      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <DataTable
          columns={columns}
          data={searchTerm ? searchedData : processedPatientList}
          pagination
          paginationPerPage={3}
          paginationRowsPerPageOptions={[3, 10, 15]}
          theme="searchTheme"
          subHeader
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
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Vous pouvez ajouter d'autres éléments ici si nécessaire */}
            </div>
          }
          progressPending={loading}
        />

      </div>

    </div>
  );
};

export default Patient;
