import { Link } from './components';

function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <h1>Page Not Found</h1>
      <Link to={'/'}>got to main page</Link>
    </div>
  );
}

export default NotFoundPage;
