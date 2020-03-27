import React from 'react';

import './ButtonContainer.scss';

const ButtonContainer = (props) => {
  const buttonContainerClass = ['ButtonContainer'];
  buttonContainerClass.push(props.type);
  return (
    <div className={buttonContainerClass.join(' ')}>
      {props.children}
    </div>
  )
}

export default ButtonContainer;
