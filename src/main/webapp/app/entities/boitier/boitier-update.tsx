/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBoitier } from 'app/shared/model/boitier.model';
import { getEntity, updateEntity, createEntity, reset } from './boitier.reducer';
import { getEntities as getCapteurs } from 'app/entities/capteur/capteur.reducer';
import { getEntities as  getEntitiesBoitierCapteur, updateEntity as updateEntityBoitierCapteur, createEntity as createEntityBoitierCapteur, deleteEntity as deleteEntityBoitierCapteur } from '../boitier-capteur/boitier-capteur.reducer';
import './cssFile.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
export const BoitierUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const boitierEntity = useAppSelector(state => state.boitier.entity);
  const loading = useAppSelector(state => state.boitier.loading);
  const updating = useAppSelector(state => state.boitier.updating);
  const updateSuccess = useAppSelector(state => state.boitier.updateSuccess);
  const capteurs = useAppSelector(state => state.capteur.entities);
  const boitierCapteurEntities = useAppSelector(state => state.boitierCapteur.entities);
  const boitiers = useAppSelector(state => state.boitier.entities);
  const loadingbc = useAppSelector(state => state.boitierCapteur.loading);
  const updatingbc = useAppSelector(state => state.boitierCapteur.updating);
  const updateSuccessbc = useAppSelector(state => state.boitierCapteur.updateSuccess);
  const [etatChecked, setEtatChecked] = useState(false);
  const [selectedCapteurs, setSelectedCapteurs] = useState('');
  const [elementList, setElementList] = useState([]);
  const [step, setStep] = useState(1);
  const [initialCapteurs, setInitialCapteurs] = useState([]);

  const [formData1, setFormData1] = useState(() => {
    return {
      type: '',
      ref: '',
      nbrBranche: '',
      capteurs: '',
      branche: ''
    };
  });

  useEffect(() => {
    if (!isNew) {
      setFormData1({
        type: boitierEntity.type,
        ref: boitierEntity.ref,
        nbrBranche: boitierEntity.nbrBranche,
        capteurs: '',
        branche: ''
      });
      const relatedCapteurs = boitierCapteurEntities.filter((entry) => entry.boitiers.id === boitierEntity.id);
      setElementList(relatedCapteurs.map((entry) => ({
        branche: entry.branche,
        capteur: entry.capteurs,
        etat: entry.etat
      })));
    }
  }, [boitierEntity, boitierCapteurEntities]);
  const handleEtatChange = (event) => {
    setEtatChecked(event.target.checked);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
  };



  const handleAddElement = () => {
    const newElement = {
      branche: formData1.branche,
      capteur: capteurs.find((capteur) => capteur.id === parseInt(formData1.capteurs, 10)),
      etat: etatChecked
    };
    setElementList([...elementList, newElement]);
    setFormData1({
      ...formData1,
      capteurs: '',
      branche: '',
    })
  };
  const handleRemoveElement = async (index, element) => {
    const itemToDeleteIndex = boitierCapteurEntities.findIndex(
      (entry) => entry.capteurs.id === element.capteur.id
    );
    const updatedList = elementList.filter((_, i) => i !== index);
    setElementList(updatedList);
    if (itemToDeleteIndex !== -1) {
      try {
        const itemToDelete = boitierCapteurEntities[itemToDeleteIndex];
        await dispatch(deleteEntityBoitierCapteur(itemToDelete.id));
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const updatedList = elementList.filter((_, i) => i !== index);
        setElementList(updatedList);
      } catch (error) {
        ///consle
      }

    }
  };

  const handleClose = () => {
    navigate('/boitier');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
    dispatch(getEntitiesBoitierCapteur({}));
    dispatch(getCapteurs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = async (values) => {
    const entity = {
      ...boitierEntity,
      type:formData1.type,
      ref:formData1.ref,
      nbrBranche:formData1.nbrBranche
    };

    if (isNew) {
      try {
        const savedEntity = await dispatch(createEntity(entity));
        const newBoitierId = savedEntity.payload["data"];
        const relatedCapteurs = boitierCapteurEntities.filter((entry) => entry.boitiers.id === entity.id);
        for (const c of elementList) {
          let capteurExists = false;
          for (const a of relatedCapteurs) {
            if (c.capteur.id === a.capteurs.id) {
              capteurExists = true;
              break;
            }
          }
          if (!capteurExists) {
            const boitierCapteurEntityy = {
              branche:c.branche,
              etat:c.etat,
              capteurs:c.capteur,
              boitiers: newBoitierId,
            };
            dispatch(createEntityBoitierCapteur(boitierCapteurEntityy));
          } else {
            //console.log("ID Capteur existe déjà, ne pas insérer : ", c.capteur.id);
          }
        }
      }catch (err){
        //console.error("not save!!!");
      }

    } else {
      try {
        const savedEntity = await dispatch(updateEntity(entity));
        const newBoitierId = savedEntity.payload["data"];
        const relatedCapteurs = boitierCapteurEntities.filter((entry) => entry.boitiers.id === entity.id);
        for (const c of elementList) {
          let capteurExists = false;

          for (const a of relatedCapteurs) {
            if (c.capteur.id === a.capteurs.id) {
              capteurExists = true;
              break;
            }
          }

          if (!capteurExists) {
            //console.log("ID Capteur n'existe pas encore, insérer : ", c.capteur.id);
            const boitierCapteurEntityy = {
              branche: c.branche,
              etat: c.etat,
              capteurs: c.capteur,
              boitiers: newBoitierId,
            };
            dispatch(createEntityBoitierCapteur(boitierCapteurEntityy));
          } else {
            //console.log("ID Capteur existe déjà, ne pas insérer : ", c.capteur.id);
          }
        }
      } catch (err) {
        //console.error("not update!!!");
      }
    }

  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
        ...boitierEntity,
        ...formData1
      };


  const handleNext = () => {
    if (step === 1 && formData1.type && formData1.ref && formData1.nbrBranche) {
      setStep(step + 1);
    }
    if (step === 2 && formData1.capteurs && formData1.branche) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };


  return (
    <div className="container mt-5">
      <Row className="row mb-5">
        <Col md="8">
          <h2 id="appBiomedicaleApp.boitier.home.createOrEditLabel" data-cy="BoitierCreateUpdateHeading">
            <Translate contentKey="appBiomedicaleApp.boitier.home.createOrEditLabel">Create or edit a Boitier</Translate>
          </h2>
        </Col>
      </Row>
      <div className="d-flex mb-4 text-center">
        <div className="step">
          <div className={`circle ${step === 1 && (!formData1.type || !formData1.ref || !formData1.nbrBranche) ? '' : 'checked'}`}>1</div>
          <div className="label">Step 1</div>
        </div>
        <div className="divider text-center mt-3"></div>
        <div className="step">
          <div className={`circle ${step === 2 && (!formData1.capteurs || !formData1.branche || elementList.length===0) ? '' : 'checked'}`}>2</div>
          <div className="label">Step 2</div>
        </div>
      </div>
      <Col md="12">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
            {step === 1 ? (
              <div className="mb-3 offset-3 col-7">
                {!isNew ? (
                  <ValidatedField
                    name="id"
                    required
                    readOnly
                    id="boitier-id"
                    value={boitierEntity.id}
                    label={translate('global.field.id')}
                    validate={{ required: true }}
                  />
                ) : null}
                <ValidatedField
                  label={translate('appBiomedicaleApp.boitier.type')}
                  id="boitier-type"
                  name="type"
                  data-cy="type"
                  type="select" // Changement du type en "select"
                  value={formData1.type}
                  onChange={handleInputChange}
                >
                  <option value="" key="0" disabled>
                    Sélectionner un type
                  </option>
                  <option value="Uno" key="1">
                    Uno
                  </option>
                  <option value="Nano" key="2">
                    Nano
                  </option>
                  <option value="Mega" key="3">
                    Mega
                  </option>
                  <option value="Due" key="4">
                    Due
                  </option>
                  <option value="Micro" key="7">
                    Micro
                  </option>
                </ValidatedField>

                <ValidatedField
                  label={translate('appBiomedicaleApp.boitier.ref')}
                  id="boitier-ref"
                  name="ref"
                  data-cy="ref"
                  type="text"
                  value={formData1.ref}
                  onChange={handleInputChange}
                />
                <ValidatedField
                  label={translate('appBiomedicaleApp.boitier.nbrBranche')}
                  id="boitier-nbrBranche"
                  name="nbrBranche"
                  data-cy="nbrBranche"
                  type="number"
                  value={formData1.nbrBranche}
                  onChange={handleInputChange}
                />


              </div>
            ) : (
              <div className="d-flex mb-3 offset-1">
                <div className="col-5">
                  <ValidatedField
                    id="boitier-capteur-capteurs"
                    name="capteurs"
                    data-cy="capteurs"
                    label={translate('appBiomedicaleApp.boitierCapteur.capteurs')}
                    type="select"
                    value={formData1.capteurs}
                    onChange={handleInputChange}
                  >
                    <option value="" key="0" />
                    {capteurs
                      ? capteurs.map((otherEntity) => {
                        const isLinkedToBoitier = boitierCapteurEntities.some(
                          (boitierCapteur) => boitierCapteur.capteurs.id === otherEntity.id
                        );
                        const isAlreadyInList = elementList.some(
                          (element) => element.capteur.id === otherEntity.id
                        );
                        if (!isLinkedToBoitier && !isAlreadyInList) {
                          return (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.type}
                            </option>
                          );
                        }
                        return null;
                      })
                      : null}
                  </ValidatedField>

                  <ValidatedField
                    label={translate('appBiomedicaleApp.boitierCapteur.branche')}
                    id="boitier-capteur-branche"
                    name="branche"
                    data-cy="branche"
                    type="select"
                    value={formData1.branche}
                    onChange={handleInputChange}
                  >
                    <option value="" key="0" />
                    {['A1', 'A2', 'A3','A4'].map((brancheOption) => (
                      !elementList.some((element) => element.branche === brancheOption) ? (
                        <option value={brancheOption} key={brancheOption}>
                          {brancheOption}
                        </option>
                      ) : null
                    ))}
                  </ValidatedField>
                  <ValidatedField
                    label={translate('appBiomedicaleApp.boitierCapteur.etat')}
                    id="boitier-capteur-etat"
                    name="etat"
                    data-cy="etat"
                    check
                    type="checkbox"
                    onChange={handleEtatChange}
                  />
                  <div className="d-flex justify-content-end ">
                    <button type={"button"} onClick={handleAddElement} className="btn btn-info"
                            disabled={!formData1.capteurs || !formData1.branche}
                    >
                      <FontAwesomeIcon icon={faPlus} style={{ background: "none", border: "none" }} />
                      Add
                    </button>
                  </div>

                </div>
                <br/>
                <div className="col-6 mx-lg-5">
                  <table className="table table-striped mt-3">
                    <thead className="table-info">
                    <tr>
                      <th scope="col">Capteurs</th>
                      <th scope="col">Branche</th>
                      <th scope="col">État</th>
                      <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {elementList.map((element, index) => (
                      <tr key={index}>
                        <td>{element.capteur.id}</td>
                        <td>{element.branche}</td>
                        <td>{element.etat ? 'Active' : 'Inactive'}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveElement(index, element)}
                            type="button"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>

                  <br/>
                </div>
              </div>
            )}
            <div className="d-flex justify-content ">

              {step === 2 && (
                <button type={"button"} className="btn btn-secondary me-2" onClick={handleBack}>
                  <FontAwesomeIcon icon={faArrowLeft} /> {/* Utilisation de l'icône de flèche gauche pour le bouton Back */}
                </button>
              )}
              {step === 1 && (
                <button
                  className="btn btn-info float-lg-end"
                  type="button"
                  onClick={handleNext}
                  disabled={!formData1.type || !formData1.ref || !formData1.nbrBranche}
                >
                  <FontAwesomeIcon icon={faArrowRight} /> {/* Utilisation de l'icône de flèche droite pour le bouton Next */}
                </button>

              )}
            </div>
            <hr className="my-4 invisible-hr" />
            <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/boitier" replace color="primary">
              <FontAwesomeIcon icon="arrow-left" />
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
                 </span>
            </Button>
            <Button className="mx-2 float-lg-end" color="success" id="save-entity" data-cy="entityCreateSaveButton" type="submit"  disabled={updating || (step === 1 && (!formData1.type || !formData1.ref || !formData1.nbrBranche) || (elementList.length ===0 ))}>
              <FontAwesomeIcon icon="save" />
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ValidatedForm>
        )}
      </Col>
    </div>
  );
};

export default BoitierUpdate;
