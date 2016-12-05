import React from 'react';
import Button from './button';

const Card = (props) => {
  const classes = (props.className || '').concat(' card');
  const titleElement = (props.tabFunction)
    ? <Button className="tab" text={props.title} clickHandler={props.tabFunction} />
    : <h2>{props.title}</h2>;

  return (
    <div className={classes}>
      {titleElement}
      {props.children}
    </div>
  );
};

export default Card;

Card.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  tabFunction: React.PropTypes.func,
};
