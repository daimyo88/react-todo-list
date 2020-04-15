import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';

import { faSignOutAlt, faTrash, faPen, faCheck, faArrowUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './App.scss';
import './assets/scss/forms.scss';

import Header from './layout/Header/Header';
import Intro from './layout/Intro/Intro';
import Footer from './layout/Footer/Footer';
import Todolist from './components/Todolist/Todolist';
import UserLogin from './components/userControls/UserLogin/UserLogin';
import Loader from './ui/Loader/Loader';

axios.defaults.baseURL = 'https://todo-list-16361.firebaseio.com/';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user : {
        name: ''
      },
      logined : false,
      checkingUserStatus: true
    }

    this.library = library;
  }

  checkUser = (username) => {
    const logined = (username === '') ? false : true;
    this.setState((state) => {
      return {
        user : {
          name : username
        },
        logined : logined,
        checkingUserStatus : false
      }
    })
  
  }

  setUser = (username) => {
    this.setState((state) => {
      return {
        checkingUserStatus : true
      }    
    });

    const data = {
      name : username
    }

    axios.put('/user.json', data )
    .then((res) => {
      this.checkUser(res.data.name);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  logout = () => {
    this.setUser('');
  }

  userLogin = (username) => {
    this.setUser(username);
  }

  componentDidMount() {
    axios.get('/user.json')
          .then((res) => {
            this.checkUser(res.data.name)
          })
          .catch((err) => {
            console.log(err);
          })
  }

  render() {
    this.library.add(faSignOutAlt, faTrash, faPen, faCheck, faArrowUp, faChevronDown );

    const loader =  this.state.checkingUserStatus === true ? <Loader /> : null;

    return (
      <div className="App">
     
        <Header
          user={this.state.user}
          logout = {this.logout}
        />

        <main>

          { loader }

          <Switch>
            <Route path="/" exact render={() => <Intro {...this.state} />} />
            
            { this.state.checkingUserStatus === false ? 
            <Route path="/login" render={(props) => <UserLogin {...this.state} submitHandler={this.userLogin} /> } /> : null
            }
            
            { this.state.logined === true && this.state.checkingUserStatus === false ? 
            <Route path="/tasks" exact component={Todolist} /> : <Redirect to="/login" />
             }
           
            { this.state.checkingUserStatus === false && this.state.logined === false ? 
              <Redirect to="/" /> : null
            }
          </Switch>

        </main>

        <Footer />

      </div>
    );
  }

}

export default App;
