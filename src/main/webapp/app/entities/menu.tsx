import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/medecin">
        <Translate contentKey="global.menu.entities.medecin" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/patient">
        <Translate contentKey="global.menu.entities.patient" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/boitier">
        <Translate contentKey="global.menu.entities.boitier" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/capteur">
        <Translate contentKey="global.menu.entities.capteur" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/mesure">
        <Translate contentKey="global.menu.entities.mesure" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/video">
        <Translate contentKey="global.menu.entities.video" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/extra-user">
        <Translate contentKey="global.menu.entities.extraUser" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/medecin-patient">
        <Translate contentKey="global.menu.entities.medecinPatient" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/boitier-patient">
        <Translate contentKey="global.menu.entities.boitierPatient" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/boitier-capteur">
        <Translate contentKey="global.menu.entities.boitierCapteur" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
