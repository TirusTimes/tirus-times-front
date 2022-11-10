import {
  BrowserRouter as Router,
  Routes as RoutesContainer,
  Route,
} from 'react-router-dom';

import Home from './Home';
import SignUp from './SignUp';

const Routes = (): JSX.Element => {
  return (
    <Router>
      <RoutesContainer>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </RoutesContainer>
    </Router>
  );
};

export default Routes;
