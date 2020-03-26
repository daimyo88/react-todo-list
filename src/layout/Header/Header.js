import React from 'react';

import './Header.scss';

import UserControl from './UserControl/UserControl';

const Header = (props) => {

    return (
      <div className="Header">
        <div className="logo">YTDL</div>
        <UserControl
          user = {props.user}
          setUser = {(userName) => props.setUser(userName)}
          logout = {props.logout}
        />
      </div>

    )

}

export default Header;
