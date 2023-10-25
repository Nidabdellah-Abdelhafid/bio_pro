import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem {
  children: React.ReactNode;
  icon: IconProp;
  to: string;
  id?: string;
  'data-cy'?: string;
  hasAnyAuthorities?: string[];
}

const MenuItem: React.FC<IMenuItem> = ({ icon, to, id, 'data-cy': dataCy, hasAnyAuthorities, children }) => {
  // Votre implémentation de la fonction MenuItem ici
  return (
    <DropdownItem tag={Link} to={to} id={id} data-cy={dataCy}>
      <FontAwesomeIcon icon={icon} fixedWidth /> {children}
    </DropdownItem>
  );
};

export default MenuItem;
