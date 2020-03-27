import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';

import { library } from '@fortawesome/fontawesome-svg-core';

import { faSignOutAlt, faTrash, faPen, faCheck, faArrowUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import Todolist from './components/Todolist/Todolist';
import Modal from './ui/modals/Modal/Modal';
import Backdrop from './ui/Backdrop/Backdrop';
import ButtonContainer from './ui/buttons/ButtonContainer/ButtonContainer';
import Button from './ui/buttons/Button/Button';
import AuxWrapper from './wrappers/AuxWrapper';
import TaskForm from './components/TaskForm/TaskForm';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user : 'Denys',
      currentTask : {
        id : '666',
        title: 'testtset',
        description: 'testest',
        priority: '0',
        status : false,
        descriptionOpen : false
      },
      modal : {
          display : false,
          type : 'delete',
          handler : '',
      },
      tasks : [
        {
          id : '1111',
          title: 'Task1',
          description: 'Lorem Ipsum',
          priority: '2',
          status : false,
          descriptionOpen : false
        },
        {
          id : '2222',
          title: 'Task2',
          description: 'Lorem Ipsum',
          priority: '1',
          status : true,
          descriptionOpen : false
        },
        {
          id : '3333',
          title: 'Task3',
          description: '',
          priority: '3',
          status : false,
          descriptionOpen : false
        },
        {
          id : '4444',
          title: 'Task4',
          description: 'Lorem Ipsum',
          priority: '0',
          status : false,
          descriptionOpen : false
        }
      ]
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

  closeModal = () => {
    this.setState((state) => {
      return {
        currentTask : {
          id : '666',
          title: 'testtset',
          description: 'testest',
          priority: '0',
          status : false,
          descriptionOpen : false
        },
        modal : {
            display : false
        }
      }
    })
  }

  setModal = (type) => {
    this.setState((state) => {
      return {
        modal : {
          display: true,
          type : type
        }
      }
    })
  }

  setCurrentTask = (task) => {
    this.setState((state) => {
      return {
        currentTask : task
      }
    });
  }

  toggleDescription = (id) => {
    const tasks = [...this.state.tasks];
    const i = tasks.findIndex(el => el.id === id);
    tasks[i].descriptionOpen = !tasks[i].descriptionOpen;
    this.setState({tasks})
  }

  deleteTask = (id) => {
    let tasks = [...this.state.tasks];
    const i = tasks.findIndex(el => el.id === id);
    tasks.splice(i, 1);
    this.setState({tasks})
  }

  changeStatusTask = (id, status) => {
    let tasks = [...this.state.tasks];
    const i = tasks.findIndex(el => el.id === id);
    tasks[i].status = status;
    this.setState({tasks})
  }

  addNewTask = () => {
    this.setState((state) => {
      let tasks = [...state.tasks];
      tasks.unshift(state.currentTask);
      return {
        tasks
      }
    })
  }

  render() {
    this.library.add(faSignOutAlt, faTrash, faPen, faCheck, faArrowUp, faChevronDown );

    let modalContent = '';
    let confirmHandler = '';

    switch(this.state.modal.type) {
      case 'delete':
      modalContent = ReactHtmlParser(`<p>Do you realy want to delete <b>${this.state.currentTask.title}</b> task?</p>`);
      confirmHandler = () => {
        this.deleteTask(this.state.currentTask.id);
        this.closeModal();
      }
      break;

      case 'complete':
      modalContent = ReactHtmlParser(`<p>Do you realy want to complete <b>${this.state.currentTask.title}</b> task?</p>`);
      confirmHandler = () => {
        this.changeStatusTask(this.state.currentTask.id, true);
        this.closeModal();
      }
      break;

      case 'incomplete':
      modalContent = ReactHtmlParser(`<p>Do you realy want to mark <b>${this.state.currentTask.title}</b> task as not complete?</p>`);
      confirmHandler = () => {
        this.changeStatusTask(this.state.currentTask.id, false);
        this.closeModal();
      }
      break;

      case 'newTask':
      modalContent = (<TaskForm task={this.state.currentTask} />)
      confirmHandler = () => {
        this.addNewTask();
        this.closeModal();
      }
      break;

      default:
       modalContent = '';
    }

    let mainContent = (this.state.user !== null) ? (
      <Todolist
        tasks={this.state.tasks}
        toggleDescription = {this.toggleDescription}
        setCurrentTask = {this.setCurrentTask}
        setModal = {this.setModal}
      />
    ) : (
      <p>Greeting Anon</p>
    )

    const modal = this.state.modal.display === true ? (
      <AuxWrapper>
        <Backdrop clickHandler = {this.closeModal} />
        <Modal confirmHandler = {(id) => this.state.modals.handler } >
          {modalContent}
          <ButtonContainer type="center">
            <Button type="confirm" title="ok" clickHandler={confirmHandler}/>
            <Button type="decline" title="cancel" clickHandler={this.closeModal} />
          </ButtonContainer>
        </Modal>
      </AuxWrapper>
     ) : null;

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

        { modal }

        <Footer />

      </div>
    );
  }

}

export default App;
