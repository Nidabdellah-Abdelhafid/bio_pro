import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm,isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { locales, languages } from 'app/config/translation';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtraUser } from 'app/shared/model/extra-user.model';
import { getEntities as getExtraUsers } from 'app/entities/extra-user/extra-user.reducer';
import { IPatient } from 'app/shared/model/patient.model';
import { getEntity, updateEntity, createEntity as createEntityPatient, reset } from './patient.reducer';
import { getEntities as getEntitiesMedecins } from 'app/entities/medecin/medecin.reducer';
import { getUsers,createUser,getRoles,updateUser } from 'app/modules/administration/user-management/user-management.reducer';
import{ createEntity as cretaeEntityExtraUser,updateEntity as updateEntityExtraUser } from 'app/entities/extra-user/extra-user.reducer';
import { getEntities as getEntitiesMedecinPatient ,createEntity as createEntityMedecinPatient, updateEntity as updateEntityMedecinPatient} from 'app/entities/medecin-patient/medecin-patient.reducer';
import { IMedecin } from 'app/shared/model/medecin.model';

export const PatientUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const medecinPatientEnttity = useAppSelector(state => state.medecinPatient.entities);
  const patientEntity = useAppSelector(state => state.patient.entity);
  const loading = useAppSelector(state => state.patient.loading);
  const updating = useAppSelector(state => state.patient.updating);
  const updateSuccess = useAppSelector(state => state.patient.updateSuccess);
  const medecinList = useAppSelector(state => state.medecin.entities);
  const userextra = useAppSelector(state => state.extraUser.entities);
  const user = useAppSelector(state => state.userManagement.user);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  const handleClose = () => {
    navigate('/patient');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
      dispatch(getEntitiesMedecinPatient({}));
    }
    dispatch(getExtraUsers({}));
    dispatch(getUsers({}));
    dispatch(getEntitiesMedecins({}));
    dispatch(getRoles());
    dispatch(getEntitiesMedecinPatient({}));

  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);
  const saveEntity = async values => {
    if (isNew) {
      const userEntity = {
        login: values.login,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        activated: values.activated,
        langKey: values.langKey,
        authorities: ['ROLE_USER'],
      };
      const savedEntityUser = await dispatch(createUser(userEntity));
      const newUser = savedEntityUser.payload["data"];
      const extraUserEntity = {
        cin: values.cin,
        numeroTelephone: values.numeroTelephone,
        dateNaissance: values.dateNaissance,
        nationalite: values.nationalite,
        adresse: values.adresse,
        genre: values.genre,
        user: newUser,
      };
      const savedEntityExtraUser = await dispatch(cretaeEntityExtraUser(extraUserEntity));
      const newExtraUser = savedEntityExtraUser.payload["data"];
      const entityPatient = {
        ...patientEntity,
        ...values,
        extraUserId: newExtraUser,
      };
      const currentDate = new Date(); // Obtenir la date système actuelle
      const formattedDateDebut = currentDate.toISOString().split('T')[0]; // Format : 'AAAA-MM-JJ'
      const formattedDateFin = '0001-01-01'; // Date de fin avec des zéros
      console.log("patient",entityPatient)
      const savedEntityPatient = await dispatch(createEntityPatient(entityPatient));
      const newEntityPatient = savedEntityPatient.payload["data"];
      for (const c of medecinList) {
         if(c.id === parseInt(values.medecins,10)){
         const medecinPatientEntity = {
          dateDebut: formattedDateDebut,
          dateFin: formattedDateFin,
          medecins: c,
          patients: newEntityPatient,
          };
        dispatch(createEntityMedecinPatient(medecinPatientEntity));
      }
    }
    }
    else{
      const matchingUserExtra = userextra.find((user) => user.id === patientEntity?.extraUserId?.id);
      const userEntity = {
        id: matchingUserExtra.user.id,
        login: values.login,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        activated: values.activated,
        langKey: values.langKey,
        authorities: ['ROLE_USER'],
      };
      const savedEntityUser = await dispatch(updateUser(userEntity));
      const newUser = savedEntityUser.payload["data"];
      const extraUserEntity = {
        id: patientEntity?.extraUserId?.id,
        cin: values.cin,
        numeroTelephone: values.numeroTelephone,
        dateNaissance: values.dateNaissance,
        nationalite: values.nationalite,
        adresse: values.adresse,
        genre: values.genre,
        user: newUser,
      };
      const savedEntityExtraUser = await dispatch(updateEntityExtraUser(extraUserEntity));
      const newExtraUser = savedEntityExtraUser.payload["data"];
      console.log("extrauser",newExtraUser)
      const entityPatient = {
        ...patientEntity,
        ...values,
        extraUserId: newExtraUser,
      };
      const currentDate = new Date(); // Obtenir la date système actuelle
      const formattedDateDebut = currentDate.toISOString().split('T')[0]; // Format : 'AAAA-MM-JJ'
      const formattedDateFin = '0001-01-01'; // Date de fin avec des zéros
      const savedEntityPatient = await dispatch(updateEntity(entityPatient));
      const newEntityPatient = savedEntityPatient.payload["data"];

      for (const c of medecinList) {
         if(c.id === parseInt(values.medecins,10)){
          const extraUserId = patientEntity?.id;
          const medecinPatientAssociationId = medecinPatientEnttity.find((item) => item.patients.id === extraUserId);
          const medecinPatientEntity = {
            dateDebut: formattedDateDebut,
            dateFin: formattedDateFin,
            medecins: c,
            patients: newEntityPatient,
          };
          if (medecinPatientAssociationId) {

           // Récupérez la date de début existante
          const dateDebutExistante = medecinPatientAssociationId.dateDebut;
          const patientsExistante = medecinPatientAssociationId.patients;
          const medecinsExistante = medecinPatientAssociationId.medecins;

          // Mise à jour de la date de début et de la date de fin dans l'entité existante
          const updatedMedecinPatientEntity = {
            id: medecinPatientAssociationId.id,
            dateDebut: dateDebutExistante, // Conservez la date de début existante
            dateFin: formattedDateDebut, // Mettez à jour la date de fin
            medecins:medecinsExistante,
            patients:patientsExistante,
      };
            dispatch(updateEntityMedecinPatient(updatedMedecinPatientEntity));
            dispatch(createEntityMedecinPatient(medecinPatientEntity));

          }
          else {
          // L'association Medecin-Patient n'existe pas, créez une nouvelle association
          dispatch(createEntityMedecinPatient(medecinPatientEntity));
        }
      }

    }
    }
  };

  const defaultValues = () => {
    if (isNew) {
      return {};
    } else {
      const matchingUserExtra = userextra.find((user) => user.id === patientEntity?.extraUserId?.id);
      const loginValue = matchingUserExtra ? matchingUserExtra.user.login : '';
      const firstnamee = matchingUserExtra ? matchingUserExtra.user.firstName : '';
      const lastnamee = matchingUserExtra ? matchingUserExtra.user.lastName : '';
      const email = matchingUserExtra ? matchingUserExtra.user.email : '';
      const langKeyy = matchingUserExtra ? matchingUserExtra.user.langKey : '';
      const authoritiess = matchingUserExtra ? matchingUserExtra.user.authorities : '';

      return {
        ...patientEntity,
        extraUserId: matchingUserExtra || null,
        cin: patientEntity?.extraUserId?.cin || '',
        numeroTelephone: patientEntity?.extraUserId?.numeroTelephone || '',
        dateNaissance: patientEntity?.extraUserId?.dateNaissance || '',
        nationalite: patientEntity?.extraUserId?.nationalite || '',
        adresse: patientEntity?.extraUserId?.adresse || '',
        genre: patientEntity?.extraUserId?.genre || '',
        login: loginValue,
        firstName: firstnamee,
        lastName: lastnamee,
        email: email,
        langKey: langKeyy,
        authorities: authoritiess
      };
    }
  };
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="appBiomedicaleApp.patient.home.createOrEditLabel" data-cy="PatientCreateUpdateHeading">
            <Translate contentKey="appBiomedicaleApp.patient.home.createOrEditLabel">Create or edit a Patient</Translate>
          </h2>
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
                  id="patient-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
               <ValidatedField
                type="text"
                name="login"
                label={translate('userManagement.login')}
                validate={{
                  required: {
                    value: true,
                    message: translate('register.messages.validate.login.required'),
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&+=?^`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)$|^[.@A-Za-z0-9-]+$/,
                    message: translate('register.messages.validate.login.pattern'),
                  },
                  minLength: {
                    value: 1,
                    message: translate('register.messages.validate.login.minlength'),
                  },
                  maxLength: {
                    value: 50,
                    message: translate('register.messages.validate.login.maxlength'),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label={translate('userManagement.firstName')}
                validate={{
                  maxLength: {
                    value: 50,
                    message: translate('entity.validation.maxlength', { max: 50 }),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label={translate('userManagement.lastName')}
                validate={{
                  maxLength: {
                    value: 50,
                    message: translate('entity.validation.maxlength', { max: 50 }),
                  },
                }}
              />
              <FormText>This field cannot be longer than 50 characters.</FormText>
              <ValidatedField
                name="email"
                label={translate('global.form.email.label')}
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: translate('global.messages.validate.email.required'),
                  },
                  minLength: {
                    value: 5,
                    message: translate('global.messages.validate.email.minlength'),
                  },
                  maxLength: {
                    value: 254,
                    message: translate('global.messages.validate.email.maxlength'),
                  },
                  validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
                }}
              />
              <ValidatedField
                type="checkbox"
                name="activated"
                check
                value={true}
                disabled={!user.id}
                label={translate('userManagement.activated')}
              />
              <ValidatedField type="select" name="langKey" label={translate('userManagement.langKey')}>
                {locales.map(locale => (
                  <option value={locale} key={locale}>
                    {languages[locale].name}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('appBiomedicaleApp.extraUser.cin')}
                id="extra-user-cin"
                name="cin"
                data-cy="cin"
                type="text"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.extraUser.numeroTelephone')}
                id="extra-user-numeroTelephone"
                name="numeroTelephone"
                data-cy="numeroTelephone"
                type="text"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.extraUser.dateNaissance')}
                id="extra-user-dateNaissance"
                name="dateNaissance"
                data-cy="dateNaissance"
                type="date"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.extraUser.nationalite')}
                id="extra-user-nationalite"
                name="nationalite"
                data-cy="nationalite"
                type="text"
              />
              <ValidatedField
                label={translate('appBiomedicaleApp.extraUser.adresse')}
                id="extra-user-adresse"
                name="adresse"
                data-cy="adresse"
                type="text"
              />
              <ValidatedField
             label={translate('appBiomedicaleApp.extraUser.genre')}
             id="extra-user-genre"
             name="genre"
             data-cy="genre"
             type="select"

            >
            <option value="" key="0" />
            <option value="femme" key="1" >Femme</option>
            <option value="homme" key="2" >Homme</option>
            </ValidatedField>
              <ValidatedField
                label={translate('appBiomedicaleApp.patient.profession')}
                id="patient-profession"
                name="profession"
                data-cy="profession"
                type="text"
              />
              <ValidatedField
                id="medecin-patient-medecins"
                name="medecins"
                data-cy="medecins"
                label={translate('appBiomedicaleApp.medecinPatient.medecins')}
                type="select"
              >
                <option value="" key="0" />
                {medecinList
                  ? medecinList.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/patient" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
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

export default PatientUpdate;
