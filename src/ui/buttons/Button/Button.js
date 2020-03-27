import React from 'react';

import './Button.scss';

const Button = (props) => {
  const cssClass = ['Button'];
  cssClass.push(props.type);
  return (
    <button className={cssClass.join(' ')} onClick={props.clickHandler}>{props.title}</button>
  )
}

export default Button;
