import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TaskControls.scss';

const TaskControls = (props) => {

  return (
    <div className="TaskControls">
      {
        props.task.description !== '' ? (
          <div className="item description-toggler" onClick={() => props.toggleDescription(props.task.id)}>
            <FontAwesomeIcon icon="chevron-down" />
          </div>
        ) : null
      }
      {
        props.task.status === false ? (
          <div className="item"
            onClick={
              () => {
                props.setAction('complete');
              }
          }>
            <FontAwesomeIcon icon="check" />
          </div>
        ) : (
          <div className="item"
              onClick={
                () => {
                  props.setAction('incomplete');
                }
            }>
            <FontAwesomeIcon icon="arrow-up" />
          </div>
        )
      }

      <div className="item"
        onClick={
          () => {
            props.setAction('editTask');
          }
        }>
        <FontAwesomeIcon icon="pen" />
      </div>
      <div className="item"
        onClick={
          () => {
            props.setAction('delete');
          }
        }>
        <FontAwesomeIcon icon="trash" />
      </div>
    </div>
  )
}

export default TaskControls;
