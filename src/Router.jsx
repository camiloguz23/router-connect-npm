import { useEffect, useState, Children } from 'react';
import { EVENT } from './constants';
import { match } from 'path-to-regexp';
import NotFoundPage from './404';
import { navigation } from './navigation';
import { getPath } from './path';

export default function ProviderRoutes({
  children,
  routes = [],
  NotFound = () => <NotFoundPage />
}) {
  const [currentPath, setCurrenPath] = useState(getPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrenPath(getPath());
    };

    window.addEventListener(EVENT.PUSH_STATE, onLocationChange);
    window.addEventListener(EVENT.POP_STATE, onLocationChange);
    return () => {
      window.removeEventListener(EVENT.PUSH_STATE, onLocationChange);
      window.removeEventListener(EVENT.POP_STATE, onLocationChange);
    };
  }, []);

  let params = {};

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === 'Route';
    return isRoute ? props : null;
  });

  const RoutesList = routes.concat(routesFromChildren).filter(Boolean);

  const component = RoutesList.find(({ path }) => {
    if (path === currentPath) return true;

    const matchUrl = match(path, { decode: decodeURIComponent });
    const matched = matchUrl(currentPath);

    if (!matched) return false;

    params = matched.params;

    return true;
  });
  const Pages = component?.Component ? (
    <component.Component params={params} />
  ) : (
    <NotFound />
  );

  if (component?.guard) {
    return component.guard()
      ? <component.Component />
      : navigation(component.backPath || '/');
  } else {
    return Pages;
  }
}
