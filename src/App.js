import React, {Component} from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';

import { faSignOutAlt, faTrash, faPen, faCheck, faArrowUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './App.scss';
import './assets/scss/forms.scss';

import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import Todolist from './components/Todolist/Todolist';
import UserLogin from './components/userControls/UserLogin/UserLogin';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user : null
    }

    this.library = library;
  }

  setUser = (username) => {
    localStorage.setItem('user', username);
  }

  checkUser = () => {
    const user = localStorage.getItem('user');
    this.setState({
        user : user
    });
  }

  logout = () => {
    localStorage.clear();
    this.checkUser();
  }

  userLogin = (username) => {
    this.setUser(username);
    this.checkUser();
  }


  render() {
    this.library.add(faSignOutAlt, faTrash, faPen, faCheck, faArrowUp, faChevronDown );


    let mainContent = (this.state.user !== null) ? (
      <Todolist />
    ) : (
      <UserLogin submitHandler={this.userLogin} />
    )

    return (
      <div className="App">
        <Header
          user={this.state.user}
          logout = {this.logout}
        />

        <main>
          { mainContent }
        </main>

        <Footer />

      </div>
    );
  }

}

export default App;
