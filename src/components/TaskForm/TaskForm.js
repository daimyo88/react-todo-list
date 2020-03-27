import React, {Component} from 'react';

class TaskForm extends Component {
  constructor(props) {
    super();
    this.state = {
      task : props.task
    };
  }

  render() {
    return(
      <div className="TaskForm">task form</div>
    )
  }
}

export default TaskForm;
