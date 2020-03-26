import React, { Component } from 'react';

import AuxWrapper from '../../wrappers/AuxWrapper';
import Task from './Task/Task';

class Todolist extends Component {
  state = {
    tasks : [
      {
        id : '1111',
        title: 'Task1',
        description: 'Lorem Ipsum',
        priority: '0'
      },
      {
        id : '2222',
        title: 'Task2',
        description: 'Lorem Ipsum',
        priority: '1'
      },
      {
        id : '3333',
        title: 'Task3',
        description: 'Lorem Ipsum',
        priority: '2'
      }
    ]
  }

  render() {
    const tasks = this.state.tasks.map((el, i) => {
            return (
              <Task
                key = {i}
                task = {el}
              />
            )
          });

    return (
      <AuxWrapper>
        { tasks }
      </AuxWrapper>
    )
  }

}

export default Todolist;
