import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TaskControls.scss';

const TaskControls = (props) => {
  return (
    <div className="TaskControls">
      <div className="item">
        <FontAwesomeIcon icon="trash" />
      </div>
    </div>
  )
}

export default TaskControls;
