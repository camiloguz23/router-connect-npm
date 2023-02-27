import { EVENT } from '../constants';

export function navigation(href) {
  window.history.pushState({}, '', href);
  const navigationEvent = new Event(EVENT.PUSH_STATE);
  window.dispatchEvent(navigationEvent);
}
