import { Link } from '../components';

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to={'/about'}>go to About</Link>
    </>
  );
}
