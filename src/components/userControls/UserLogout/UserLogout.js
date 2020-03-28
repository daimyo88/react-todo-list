import React , { Component } from 'react';

import AuxWrapper from '../../../wrappers/AuxWrapper';
import ButtonContainer from '../../../ui/buttons/ButtonContainer/ButtonContainer';
import Button from '../../../ui/buttons/Button/Button';
import Modal from '../../../ui/modals/Modal/Modal';
import Backdrop from '../../../ui/Backdrop/Backdrop';

import './UserLogout.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserLogout extends Component {
  constructor(props) {
    super();
    this.state = {
      modal : false
    }
  }

  toggleModal = (bool) => {
    this.setState({
      modal : bool
    })
  }

  render() {
    const userMessage = (
      <div className="UserLogout">
        <div className="user">Hello, {this.props.user}</div>
        <FontAwesomeIcon
          icon="sign-out-alt"
          onClick={() => this.toggleModal(true)}
          />
      </div>
    )

    const modal = this.state.modal === true ? (
      <AuxWrapper>
        <Backdrop clickHandler = {() => this.toggleModal(false)} />
        <Modal>
          <p>Do you want to logout? <br /> All tasks will be deleted</p>
          <ButtonContainer type="center">
            <Button type="confirm" title="ok" clickHandler={this.props.logout}/>
            <Button type="decline" title="cancel" clickHandler={() => this.toggleModal(false)}  />
          </ButtonContainer>
        </Modal>
      </AuxWrapper>
    ) : null;

    return (
      <AuxWrapper>
        { userMessage }
        { modal }
      </AuxWrapper>
    )
  }

}


export default UserLogout;
