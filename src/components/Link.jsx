import { navigation } from '../navigation';

function Link({ target, to, ...props }) {
  const onClick = (event) => {
    const isMainEvent = event.button === 0;
    const isModify =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === '_self';

    if (isMainEvent && isManageableEvent && !isModify) {
      event.preventDefault();
      navigation(to);
      window.scrollTo(0, 0);
    }
  };

  return <a onClick={onClick} href={to} target={target} {...props} />;
}

export default Link;
