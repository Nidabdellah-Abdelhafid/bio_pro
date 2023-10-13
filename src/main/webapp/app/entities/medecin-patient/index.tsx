import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MedecinPatient from './medecin-patient';
import MedecinPatientDetail from './medecin-patient-detail';
import MedecinPatientUpdate from './medecin-patient-update';
import MedecinPatientDeleteDialog from './medecin-patient-delete-dialog';

const MedecinPatientRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MedecinPatient />} />
    <Route path="new" element={<MedecinPatientUpdate />} />
    <Route path=":id">
      <Route index element={<MedecinPatientDetail />} />
      <Route path="edit" element={<MedecinPatientUpdate />} />
      <Route path="delete" element={<MedecinPatientDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MedecinPatientRoutes;
