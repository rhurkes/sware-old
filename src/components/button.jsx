import React from 'react';

const Button = props =>
  (
    <button className={props.className} onClick={props.clickHandler}>{props.text}</button>
  );

Button.propTypes = {
  clickHandler: React.PropTypes.func,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default Button;
