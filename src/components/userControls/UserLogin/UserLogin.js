import React , { Component } from 'react';

import ButtonContainer from '../../../ui/buttons/ButtonContainer/ButtonContainer';
import Button from '../../../ui/buttons/Button/Button';

import './UserLogin.scss';

class UserLogin extends Component {
    constructor(props) {
      super();
      this.state = {
        username : '',
        validationError : false
      }
    }

    defaultSubmit = (event) => {
      event.preventDefault();
    }

    changeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    submitHandler = () => {
      const data = this.state.username

      if (data !== '') {
        this.props.submitHandler(data)
      } else {
        this.setState({
          validationError : true
        })
      }
    }

    render() {
      return (
        <div className="UserLogin">
          <h3>Welcome!</h3>
          <p>To start work please enter your name: </p>
          <form onSubmit={this.defaultSubmit} >
            <div className="input-block">
              { this.state.validationError === true ? (
                <div className="validation-message">This field should not be empty</div>
              ) : null }
              <input onChange={this.changeHandler} type="text" name="username" value={this.state.username}/>
            </div>
          </form>

          <ButtonContainer type="center">
            <Button type="confirm" title="Enter" clickHandler={this.submitHandler}/>
          </ButtonContainer>

        </div>
      )
    }

}

export default UserLogin;
