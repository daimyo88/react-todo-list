import React from 'react';

import './Header.scss';

import UserLogout from '../../components/userControls/UserLogout/UserLogout';

const Header = (props) => {

    return (
      <div className="Header">
        <div className="logo">YTDL</div>
        {
          props.user !== null ? (
            <UserLogout
              user = {props.user}
              logout = {props.logout}
            />
          ) : null
        }

      </div>

    )

}

export default Header;
