import medecin from 'app/entities/medecin/medecin.reducer';
import patient from 'app/entities/patient/patient.reducer';
import boitier from 'app/entities/boitier/boitier.reducer';
import capteur from 'app/entities/capteur/capteur.reducer';
import mesure from 'app/entities/mesure/mesure.reducer';
import video from 'app/entities/video/video.reducer';
import extraUser from 'app/entities/extra-user/extra-user.reducer';
import medecinPatient from 'app/entities/medecin-patient/medecin-patient.reducer';
import boitierPatient from 'app/entities/boitier-patient/boitier-patient.reducer';
import boitierCapteur from 'app/entities/boitier-capteur/boitier-capteur.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  medecin,
  patient,
  boitier,
  capteur,
  mesure,
  video,
  extraUser,
  medecinPatient,
  boitierPatient,
  boitierCapteur,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
