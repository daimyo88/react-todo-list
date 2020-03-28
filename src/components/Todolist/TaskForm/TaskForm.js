import React, {Component} from 'react';

import './TaskForm.scss';

import AuxWrapper from '../../../wrappers/AuxWrapper';
import ButtonContainer from '../../../ui/buttons/ButtonContainer/ButtonContainer';
import Button from '../../../ui/buttons/Button/Button';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : '',
      description : '',
      priority : "0",
      validationError : false,
      id : '',
      status : false
    };
  }

  componentDidMount() {

    if (this.props.task !== '') {
      const { title, description, priority, id, status } = this.props.task;
      this.setState(
         { title, description, priority, id, status }
      )
    }
  }

  formChangeHandler = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
          [name]: value
      });
  }

  submitHandler = () => {
    const data = {
      title : this.state.title,
      description : this.state.description,
      priority : this.state.priority,
      id : this.state.id,
      status : this.state.status
    }

    if (data.title !== '') {

      this.props.submitHandler(data);
      this.props.cancelHandler();
    } else {
      this.setState({
        validationError : true
      })
    }
  }

  cancelHandler = () => {
    this.props.cancelHandler();
  }

  defaultSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return(
      <AuxWrapper>
        <form onSubmit={this.defaultSubmit} className="TaskForm">
          <div className="input-block">
            <div className="input-label">Title</div>
            { this.state.validationError === true ? (
              <div className="validation-message">This field should not be empty</div>
            ) : null }
            <input onChange={this.formChangeHandler} type="text" name="title" value={this.state.title}/>
          </div>

          <div className="input-block">
            <div className="input-label">Description</div>
            <textarea onChange={this.formChangeHandler} name="description" value={this.state.description} />
          </div>

          <div className="input-block">
            <div className="input-label additional-margin">Priority</div>
            <div className="checkbox-item priority-high">
              <input
                  onChange={this.formChangeHandler}
                  name="priority"
                  type="radio"
                  value="0"
                  id="priority-0"
                  checked={this.state.priority === '0' ? true : false} />
              <label htmlFor="priority-0">High</label>
            </div>
            <div className="checkbox-item priority-medium">
              <input
                  onChange={this.formChangeHandler}
                  name="priority"
                  type="radio"
                  value="1"
                  id="priority-1"
                  checked={this.state.priority === '1' ? true : false} />
              <label htmlFor="priority-1">Medium</label>
            </div>
            <div className="checkbox-item priority-low">
              <input
                  onChange={this.formChangeHandler}
                  name="priority"
                  type="radio"
                  value="2"
                  id="priority-2"
                  checked={this.state.priority === '2' ? true : false} />
              <label htmlFor="priority-2">Low</label>
            </div>
          </div>
        </form>

        <ButtonContainer type="center">
          <Button type="confirm" title="Ok" clickHandler={this.submitHandler}/>
          <Button type="decline" title="Cancel" clickHandler={this.cancelHandler}/>
        </ButtonContainer>

      </AuxWrapper>

    )
  }
}

export default TaskForm;
