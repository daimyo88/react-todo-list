import React, {Component} from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'

import { faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import Todolist from './components/Todolist/Todolist';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user : 'Denys'
    }

    this.library = library;
  }

  setUser = userName => {
    localStorage.setItem('user', userName);
    const user = localStorage.getItem('user');

    this.setState({
        user : user,
    });
  }

  logout = () => {

    localStorage.clear();
    const user = localStorage.getItem('user');

    this.setState({
        user : user
    });
  }

  render() {
    this.library.add(faSignOutAlt, faTrash );

    let mainContent = (this.state.user !== null) ? (
      <Todolist
        tasks={this.state.tasks}
      />
    ) : (
      <p>Greeting Anon</p>
    )

    return (
      <div className="App">
        <Header
          user={this.state.user}
          setUser = {(userName) => this.setUser(userName)}
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
