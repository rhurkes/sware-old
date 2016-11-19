import { hashHistory } from 'react-router';
import store from '../store';
import { getPages } from '../ducks/app-duck';

/**
 * Maps route to title.
 */
export function getTitleFromPath(path) {
  switch (path) {
    case '/':
      return 'home';
    case '/events':
      return 'events';
    case '/events-config':
      return 'events config';
    default:
      return path;
  }
}

/**
 * Navigates to the home page.
 */
export function moveHomePage() {
  hashHistory.push('/');
}

/**
 * Navigates to the previous page.
 */
export function movePrevPage(pathname) {
  const state = store.getState();
  const pages = getPages(state);
  const currentIndex = pages.indexOf(pathname);
  let nextIndex = currentIndex - 1;
  if (nextIndex < 0) {
    nextIndex = pages.length - 1;
  }
  hashHistory.push(pages[nextIndex]);
}

/**
 * Navigates to the next page.
 */
export function moveNextPage(pathname) {
  const state = store.getState();
  const pages = getPages(state);
  const currentIndex = pages.indexOf(pathname);
  let nextIndex = currentIndex + 1;
  if (nextIndex >= pages.length) {
    nextIndex = 0;
  }
  hashHistory.push(pages[nextIndex]);
}
