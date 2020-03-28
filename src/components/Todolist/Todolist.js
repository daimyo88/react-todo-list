import React, { Component } from 'react';

import AuxWrapper from '../../wrappers/AuxWrapper';
import Task from './Task/Task';
import TaskForm from './TaskForm/TaskForm';
import ButtonContainer from '../../ui/buttons/ButtonContainer/ButtonContainer';
import Button from '../../ui/buttons/Button/Button';
import Modal from '../../ui/modals/Modal/Modal';
import Backdrop from '../../ui/Backdrop/Backdrop';

import './Todolist.scss';

class Todolist extends Component {
  constructor() {
    super();

    this.state = {
      currentTask : '',
      currentAction : '',
      tasks : []
    }
  }

  setAction = (type) => {
    this.setState((state) => {
      return {
        currentAction : type
      }
    })
  }

  resetAction = (type) => {
    this.setState((state) => {
      return {
        currentAction : '',
        currentTask : ''
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
    this.setState((state) => {
      this.setTasksToStorage(tasks);
      return {
        tasks
      }
    })
  }

  deleteTask = (id) => {
    let tasks = [...this.state.tasks];
    const i = tasks.findIndex(el => el.id === id);
    tasks.splice(i, 1);
    this.setState((state) => {
      this.setTasksToStorage(tasks);
      return {
        tasks : tasks,
        currentAction : '',
        currentTask : ''
      }
    })
  }

  changeStatusTask = (id, status) => {
    let tasks = [...this.state.tasks];
    const i = tasks.findIndex(el => el.id === id);
    tasks[i].status = status;
    this.setState((state) => {
      this.setTasksToStorage(tasks);
      return {
        tasks : tasks,
        currentAction : '',
        currentTask : ''
      }
    })
  }

  editTask = (task) => {

    this.setState((state) => {
      let tasks = [...state.tasks];
      const i = tasks.findIndex(el => el.id === task.id);
      tasks[i]  = task;
      this.setTasksToStorage(tasks);
      return {
        tasks
      }
    })
  }

  addNewTask = (task) => {
    task.id = Date.now();
    task.status = false;

    this.setState((state) => {
      let tasks = [...state.tasks];
      tasks.unshift(task);
      this.setTasksToStorage(tasks);
      return {
        tasks
      }
    });
  }

  setTasksToStorage = (tasks) => {
    const tasksString = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksString);
  }

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.setState((state) => {
      return {
        tasks
      }
    })
  }


  render() {
    const incompleteTasks = this.state.tasks.filter(el => {
      if (el.status === false) {
        return el;
      }
      return null;
    });

    let modalContent = '';

    switch(this.state.currentAction) {
      case 'delete':
      modalContent = (
        <AuxWrapper>
          <p>Do you realy want to delete task <b>{this.state.currentTask.title}</b> ?</p>
          <ButtonContainer type="center">
            <Button type="confirm" title="ok" clickHandler={() => this.deleteTask(this.state.currentTask.id)}/>
            <Button type="decline" title="cancel" clickHandler={this.resetAction} />
          </ButtonContainer>
        </AuxWrapper>
      );
      break;

      case 'complete':
      modalContent = (
        <AuxWrapper>
          <p>Do you realy want to mark task <b>{this.state.currentTask.title}</b> as complete?</p>
          <ButtonContainer type="center">
            <Button type="confirm" title="ok" clickHandler={() => this.changeStatusTask(this.state.currentTask.id, true)}/>
            <Button type="decline" title="cancel" clickHandler={this.resetAction} />
          </ButtonContainer>
        </AuxWrapper>
      )
      break;

      case 'incomplete':
      modalContent = (
        <AuxWrapper>
          <p>Do you realy want to mark task <b>{this.state.currentTask.title}</b> as not complete?</p>
          <ButtonContainer type="center">
            <Button type="confirm" title="ok" clickHandler={() => this.changeStatusTask(this.state.currentTask.id, false)}/>
            <Button type="decline" title="cancel" clickHandler={this.resetAction} />
          </ButtonContainer>
        </AuxWrapper>
      )
      break;

      case 'editTask':
      modalContent = (<TaskForm
        submitHandler = {this.editTask}
        cancelHandler={this.resetAction}
        task={this.state.currentTask}
        />)

      break;

      case 'newTask':
      modalContent = (
        <TaskForm
          submitHandler = {this.addNewTask}
          cancelHandler={this.resetAction}
          task={this.state.currentTask} />
      )

      break;

      default:
       modalContent = '';
    }

    const header = (
      <div className="todo-list-header">
        <p>You have {incompleteTasks.length} task(s) to do: </p>
        <ButtonContainer>
          <Button type="confirm" title="add new task" clickHandler={() => this.setAction('newTask')}/>
        </ButtonContainer>
      </div>
    )

    let tasks = [...this.state.tasks];
    tasks = tasks
      .sort((a, b) => a.priority - b.priority)
      .sort((a, b) => a.status - b.status)
      .map((el, i) => {
            return (
              <Task
                setCurrentTask={(task) => this.setCurrentTask(task)}
                key = {i}
                task = {el}
                toggleDescription = {this.toggleDescription}
                setAction = {(type) => this.setAction(type)}
              />
            )
          });

      const modal = this.state.currentAction !== '' ? (
        <AuxWrapper>
          <Backdrop clickHandler = {this.resetAction} />
          <Modal confirmHandler = {(id) => this.state.modals.handler } >
            {modalContent}
          </Modal>
        </AuxWrapper>
       ) : null;

      return (
        <AuxWrapper>
          { header }
          { tasks }
          { modal }
        </AuxWrapper>
      )
  }

}

export default Todolist;
