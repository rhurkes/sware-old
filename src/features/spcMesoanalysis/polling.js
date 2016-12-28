import React from 'react';
import store from '../../store';
import { addLog } from '../../ducks/app-duck';
import { updateImageURL } from './duck';

const SOURCE = 'SPCMesoanalysis';
const spcImageBase = 'http://www.spc.noaa.gov/exper/mesoanalysis';

let timer;

function buildImageURL(sector, parameterID) {
  const now = new Date();
  now.setSeconds(0);
  now.setMilliseconds(0);
  const parameter = `${parameterID}`.toLowerCase();

  return `${spcImageBase}/s${sector}/${parameter}/${parameter}.gif?${now.getTime()}`;
}

export default class IEMContainer extends React.Component {
  componentDidMount() {
    fetchData();
    store.dispatch(addLog(`started polling for ${SOURCE}`));
  }

  componentWillUnmount() {
    clearInterval(timer);
    store.dispatch(addLog(`stopped polling for ${SOURCE}`));
  }

  // Loading this component, but not actually rendering visible elements
  render() { return false; }
}
