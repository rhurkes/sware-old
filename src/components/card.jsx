import React from 'react';

const Card = props =>
  (
    <div className="card">
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );

export default Card;

Card.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node
};
