import { Home, About } from './pages';
import Route from './Route';
import ProviderRoutes from './Router';

const routes = [
  {
    path: '/',
    Component: Home
  }
];

function App() {
  return (
    <div className='App'>
      <ProviderRoutes routes={routes}>
        <Route path={'/about'} Component={About} guard={() => false}/>
      </ProviderRoutes>
    </div>
  );
}

export default App;
