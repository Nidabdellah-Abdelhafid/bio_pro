import React from 'react';
import { Translate } from 'react-jhipster';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
     <PrivateRoute hasAnyAuthorities={[AUTHORITIES.SECRETARY]}>
        <MenuItem icon="asterisk" to="/patient">
          <Translate contentKey="global.menu.entities.patient" />
        </MenuItem>
      </PrivateRoute>
      <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
        <MenuItem icon="asterisk" to="/medecin">
          <Translate contentKey="global.menu.entities.medecin" />
        </MenuItem>
      </PrivateRoute>
      <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
        <MenuItem icon="asterisk" to="/boitier">
          <Translate contentKey="global.menu.entities.boitier" />
        </MenuItem>
      </PrivateRoute>
      <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
        <MenuItem icon="asterisk" to="/capteur">
          <Translate contentKey="global.menu.entities.capteur" />
        </MenuItem>
      </PrivateRoute>
      <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
        <MenuItem icon="asterisk" to="/mesure">
          <Translate contentKey="global.menu.entities.mesure" />
        </MenuItem>
      </PrivateRoute>
      <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
        <MenuItem icon="asterisk" to="/video">
          <Translate contentKey="global.menu.entities.video" />
        </MenuItem>
      </PrivateRoute>
      <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
        <MenuItem icon="asterisk" to="/extra-user">
          <Translate contentKey="global.menu.entities.extraUser" />
        </MenuItem>
      </PrivateRoute>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
