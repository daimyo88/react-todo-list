import React from 'react';

import AuxWrapper from '../../wrappers/AuxWrapper';
import Task from './Task/Task';
import ButtonContainer from '../../ui/buttons/ButtonContainer/ButtonContainer';
import Button from '../../ui/buttons/Button/Button';

import './Todolist.scss';

const Todolist = (props) => {
  const incompleteTasks = props.tasks.filter(el => {
    if (el.status === false) {
      return el;
    }
    return null;
  });

  const header = (
    <div className="todo-list-header">
      <p>You have {incompleteTasks.length} task(s) to do: </p>
      <ButtonContainer>
        <Button type="confirm" title="add new task" clickHandler={() => props.setModal('newTask')}/>
      </ButtonContainer>
    </div>
  )

  let tasks = [...props.tasks];
  tasks = tasks
    .sort((a, b) => a.priority - b.priority)
    .sort((a, b) => a.status - b.status)
    .map((el, i) => {
          return (
            <Task
              setCurrentTask={(task) => props.setCurrentTask(task)}
              key = {i}
              task = {el}
              toggleDescription = {props.toggleDescription}
              setModal = {(type) => props.setModal(type)}
            />
          )
        });

    return (
      <AuxWrapper>
        { header }
        { tasks }
      </AuxWrapper>
    )


}

export default Todolist;
