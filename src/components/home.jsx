import React from 'react';
import Log from '../containers/log-container';
import TestChart from '../components/chart';
import SPCStats from '../components/spc-stats';
import Card from '../components/card';
import Button from '../components/button';

const Home = (props) => {
  const { pollingToggles, togglePolling } = props;

  const toggles = Object.keys(pollingToggles).map((sourceId) => {
    const source = pollingToggles[sourceId];
    const className = source.active ? 'active' : 'inactive';

    return (
      <Button
        key={sourceId}
        className={className}
        clickHandler={() => togglePolling(sourceId)}
        text={source.name}
      />
    );
  });

  return (
    <div className="page">
      <Card title="Data Sources">
        <div id="polling-toggles">{toggles}</div>
      </Card>
      <Card title="Logs">
        <Log />
      </Card>
    </div>
  );
};

export default Home;
