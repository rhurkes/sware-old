import moment from 'moment';

export const timestamp = () => `${moment.utc(Date.now()).format('HH:mm')}Z`;

export const getTimeAgo = (ts) => {
  const dt = new Date(Date.parse(ts));
  const diff = Date.now() - dt.getTime();

  if (diff < 1000 * 60) {
    return '< 1m';
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / 1000 / 60)}m`;
  }
  return `${Math.floor(diff / 1000 / 60 / 60)}h`;
};
