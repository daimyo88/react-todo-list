import React, { Component } from 'react';
import { connect } from 'react-redux';

import Task from './Task/Task';
import TaskForm from './TaskForm/TaskForm';

import ButtonContainer from '../../ui/buttons/ButtonContainer/ButtonContainer';
import Button from '../../ui/buttons/Button/Button';
import Modal from '../../ui/modals/Modal/Modal';
import Backdrop from '../../ui/Backdrop/Backdrop';
import Loader from '../../ui/Loader/Loader';

import * as actions from '../../store/actions/tasksActions';

import './Todolist.scss';

class Todolist extends Component {


  toggleDescription = (id) => {
    const tasks = [...this.state.tasks];
    const i = tasks.findIndex(el => el.id === id);
    tasks[i].descriptionOpen = !tasks[i].descriptionOpen;
    this.setState((state) => {
      
      return {
        tasks
      }
    })
  }

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const incompleteTasks = this.props.tasks.filter(el => {
      if (el.status === false) {
        return el;
      }
      return null;
    });

    let modalContent = '';

    switch(this.props.currentAction) {
      case 'delete':
      modalContent = (
        <React.Fragment>
          <p>Do you realy want to delete task <b>{this.props.currentTask.title}</b> ?</p>
          <ButtonContainer type="center">
            <Button type="confirm" title="ok" clickHandler={() => this.props.deleteTask(this.props.currentTask.id)}/>
            <Button type="decline" title="cancel" clickHandler={this.props.resetAction} />
          </ButtonContainer>
        </React.Fragment>
      );
      break;

      case 'complete':
      modalContent = (
        <React.Fragment>
          <p>Do you realy want to mark task <b>{this.props.currentTask.title}</b> as complete?</p>
          <ButtonContainer type="center">
            <Button type="confirm" title="ok" clickHandler={() => this.props.changeStatusTask(this.props.currentTask.id, true)}/>
            <Button type="decline" title="cancel" clickHandler={this.props.resetAction} />
          </ButtonContainer>
        </React.Fragment>
      )
      break;

      case 'incomplete':
      modalContent = (
        <React.Fragment>
          <p>Do you realy want to mark task <b>{this.props.currentTask.title}</b> as not complete?</p>
          <ButtonContainer type="center">
            <Button type="confirm" title="ok" clickHandler={() => this.props.changeStatusTask(this.props.currentTask.id, false)}/>
            <Button type="decline" title="cancel" clickHandler={this.props.resetAction} />
          </ButtonContainer>
        </React.Fragment>
      )
      break;

      case 'editTask':
      modalContent = (<TaskForm
        submitHandler = {this.props.editTask}
        cancelHandler={this.props.resetAction}
        task={this.props.currentTask}
        />)

      break;

      case 'newTask':
      modalContent = (
        <TaskForm
          submitHandler = {this.props.addTask}
          cancelHandler={this.props.resetAction}
          task={''} />
      )

      break;

      default:
       modalContent = null;
    }

    const header = (
      <div className="todo-list-header">
        <p>You have {incompleteTasks.length} task(s) to do: </p>
        <ButtonContainer>
          <Button type="confirm" 
                  title="add new task" 
                  clickHandler={() => {this.props.setAction('newTask'); this.props.setCurrentTask('')} }/>
        </ButtonContainer>
      </div>
    )

    let tasks = [...this.props.tasks];
    tasks = tasks
      .sort((a, b) => a.priority - b.priority)
      .sort((a, b) => a.status - b.status)
      .map((el, i) => {
            return (
              <Task
                setCurrentTask={(task) => this.props.setCurrentTask(task)}
                key = {i}
                task = {el}
                toggleDescription = {this.props.toggleDescription}
                setAction = {(type) => this.props.setAction(type)}
              />
            )
          });

      const modal = this.props.currentAction !== '' ? (
        <React.Fragment>
          <Backdrop clickHandler = {this.props.resetAction} />
          <Modal confirmHandler = {(id) => this.state.modals.handler } >
            {modalContent}
          </Modal>
        </React.Fragment>
       ) : null;

      return (
        <React.Fragment>
          { this.props.pending === true ? <Loader /> : header }
          { this.props.pending === true ? <Loader /> : tasks }

          { modal }

        </React.Fragment>
      )
  }

}

const mapStateToProps = state => {
  return {
    tasks: state.tsk.tasks,
    pending: state.tsk.pending,
    currentAction: state.tsk.currentAction,
    currentTask: state.tsk.currentTask
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(actions.getTasks()),
    addTask: (task) => dispatch(actions.addTask(task)),
    deleteTask: (id) => dispatch(actions.deleteTask(id)),
    editTask: (task) => dispatch(actions.editTask(task)),
    changeStatusTask: (id, status) => dispatch(actions.changeStatusTask(id, status)),
    setAction: (type) => dispatch(actions.setAction(type)),
    resetAction: () => dispatch(actions.resetAction()),
    setCurrentTask: (task) => dispatch(actions.setCurrentTask(task)),
    toggleDescription: (id) => dispatch(actions.toggleDescription(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
