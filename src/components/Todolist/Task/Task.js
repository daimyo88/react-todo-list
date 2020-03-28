import React from 'react';

import './Task.scss';

import TaskControls from './TaskControls/TaskControls';

const Task = (props) => {

  const cssClass = ['Task'];
  cssClass.push('Task priority-' + props.task.priority);
  if(props.task.status === true) {
    cssClass.push('complete');
  }
  if(props.task.descriptionOpen === true) {
    cssClass.push('description-open');
  }

  const mainBar = (
    <div className="main-bar" onClick={(task) => props.setCurrentTask(props.task)}>
      <h3>
        {props.task.title}
      </h3>
      <TaskControls
        task={props.task}
        toggleDescription = {props.toggleDescription}
        setAction = {props.setAction}
      />
    </div>
  )

  const description = (props.task.description !== '' && props.task.descriptionOpen === true) ? (
    <div className="description">
      { props.task.description }
    </div>
  ) : null;

  return (
    <div className={cssClass.join(' ')}>
      { mainBar }
      { description }
    </div>
  )
}

export default Task;
