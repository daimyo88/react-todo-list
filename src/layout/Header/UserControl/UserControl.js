import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserControl.scss';

import AuxWrapper from '../../../wrappers/AuxWrapper';

const UserControl = (props) => {
  let userMessage = (props.user !== null) ? (
    <div className="userControl">
      <div className="user">Hello, {props.user}</div>
      <FontAwesomeIcon
        icon="sign-out-alt"
        onClick={props.logout}
        />
    </div>
  ) : null;
  return (
    <AuxWrapper>
      { userMessage }
    </AuxWrapper>
  )
}

export default UserControl;
