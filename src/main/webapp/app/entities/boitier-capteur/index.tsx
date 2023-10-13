import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BoitierCapteur from './boitier-capteur';
import BoitierCapteurDetail from './boitier-capteur-detail';
import BoitierCapteurUpdate from './boitier-capteur-update';
import BoitierCapteurDeleteDialog from './boitier-capteur-delete-dialog';

const BoitierCapteurRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BoitierCapteur />} />
    <Route path="new" element={<BoitierCapteurUpdate />} />
    <Route path=":id">
      <Route index element={<BoitierCapteurDetail />} />
      <Route path="edit" element={<BoitierCapteurUpdate />} />
      <Route path="delete" element={<BoitierCapteurDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BoitierCapteurRoutes;
