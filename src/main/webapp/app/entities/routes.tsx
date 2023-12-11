import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Medecin from './medecin';
import Patient from './patient';
import Boitier from './boitier';
import Capteur from './capteur';
import Mesure from './mesure';
import Video from './video';
import ExtraUser from './extra-user';
import MedecinPatient from './medecin-patient';
import BoitierPatient from './boitier-patient';
import BoitierCapteur from './boitier-capteur';
import PrivateRoute from 'app/shared/auth/private-route';

/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route
          path="medecin/*"
          element={
            <PrivateRoute>
              <Medecin />
            </PrivateRoute>
          }
        />        <Route
          path="capteur/*"
          element={
            <PrivateRoute>
              <Capteur />
            </PrivateRoute>
          }
        />
      <Route
        path="boitier/*"
        element={
          <PrivateRoute>
            <Boitier />
          </PrivateRoute>
        }
      />
      <Route
        path="mesure/*"
        element={
          <PrivateRoute >
            <Mesure />
          </PrivateRoute>
        }
      /><Route
      path="video/*"
      element={
        <PrivateRoute >
          <Video />
        </PrivateRoute>
      }
    />
    <Route
        path="extra-user/*"
        element={
          <PrivateRoute >
            <ExtraUser />
          </PrivateRoute>
        }
      />

       <Route
        path="patient/*"
        element={
          <PrivateRoute >
            <Patient />
          </PrivateRoute>
        }
      />

        <Route path="medecin-patient/*" element={<MedecinPatient />} />
        <Route path="boitier-patient/*" element={<BoitierPatient />} />
        <Route path="boitier-capteur/*" element={<BoitierCapteur />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
