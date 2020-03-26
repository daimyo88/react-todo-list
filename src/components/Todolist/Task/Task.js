import React from 'react';

import './Task.scss';

import TaskControls from './TaskControls/TaskControls';

const Task = (props) => {

  const cssClass = 'Task priority-' + props.task.priority;

  return (
    <div className={cssClass}>
      <div className="main-bar">
        <h3>
          {props.task.title}
        </h3>
        <TaskControls
          task={props.task}
        />
      </div>
    </div>
  )
}

export default Task;
