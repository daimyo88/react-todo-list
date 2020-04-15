import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

import UserLogout from '../../components/userControls/UserLogout/UserLogout';

const Header = (props) => {

    return (
      <div className="Header">
        <Link to="/">
          <div className="logo">YTDL</div>
        </Link>
        {
          props.user.name !== '' ? (
            <UserLogout
              user = {props.user.name}
              logout = {props.logout}
            />
          ) : null
        }
 
      </div>

    )

}

export default Header;
