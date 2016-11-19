import React from 'react';

export const Line = (props) => {
  const { text, color, source } = props;
  const sourceText = source ? `[${source}] ` : '';
  const classes = `log-line ${color}`;

  return (<li className={classes}>{sourceText}{text}</li>);
};

const Log = (props) => {
  const lines = props.logLines.map((line, index) =>
    (<Line
      key={index}
      text={line.text}
      color={line.color}
      source={line.source}
    />)
  );

  return (
    <ol id="log">
      {lines}
    </ol>
  );
};

Line.propTypes = {
  text: React.PropTypes.string,
  color: React.PropTypes.string,
  source: React.PropTypes.string
};

Log.propTypes = {
  logLines: React.PropTypes.arrayOf(Line)
};

export default Log;
