import moment from 'moment';

export const defaultTimeStart = moment().startOf('day');
export const defaultTimeEnd = moment()
  .add(5, 'year');
export const interval = 12 * 60 * 60 * 1000;
export const sidebarWidth = 250;
export const lineHeight = 50;