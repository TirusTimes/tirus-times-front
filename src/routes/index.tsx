import {
  BrowserRouter as Router,
  Routes as RoutesContainer,
  Route,
} from 'react-router-dom';

import Home from './Home';

const Routes = (): JSX.Element => {
  return (
    <Router>
      <RoutesContainer>
        <Route path="/" element={<Home />} />
      </RoutesContainer>
    </Router>
  );
};

export default Routes;
