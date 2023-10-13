import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BoitierPatient from './boitier-patient';
import BoitierPatientDetail from './boitier-patient-detail';
import BoitierPatientUpdate from './boitier-patient-update';
import BoitierPatientDeleteDialog from './boitier-patient-delete-dialog';

const BoitierPatientRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BoitierPatient />} />
    <Route path="new" element={<BoitierPatientUpdate />} />
    <Route path=":id">
      <Route index element={<BoitierPatientDetail />} />
      <Route path="edit" element={<BoitierPatientUpdate />} />
      <Route path="delete" element={<BoitierPatientDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BoitierPatientRoutes;
