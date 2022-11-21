import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import "./scss/GlobalStyle.scss";

// import Home from './pages/Home';
// import Users  from './pages/users/Users';
// import UserPlaces  from './pages/users/UserPlaces';
// import NewPlace from './pages/places/NewPlace';
// import UpdatePlace from './pages/places/UpdatePlace';
// import Auth from './pages/users/Auth';

import ConsultaRapida from './pages/consultasRapidas/ConsultaRapida';
import ReadConsultaRapida from './pages/consultasRapidas/ReadConsultaRapida';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import EditOrSeeDetailsComponent from './pages/consultasRapidas/EditOrSeeDetailsComponent';

const Home = lazy(() => import('./pages/Home'));
const Users = lazy(() => import('./pages/users/Users'));
const UserPlaces = lazy(() => import('./pages/users/UserPlaces'));
const NewPlace = lazy(() => import('./pages/places/NewPlace'));
const UpdatePlace = lazy(() => import('./pages/places/UpdatePlace'));
const Auth = lazy(() => import('./pages/users/Auth'));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/consultaRapida/Create" component={ConsultaRapida} exact/>
        <Route path="/consultaRapida/ReadConsultaRapida" component={ReadConsultaRapida} exact/>
        <Route path="/consultaRapida/EditOrSeeDetails" component={EditOrSeeDetailsComponent} exact/>

        <Route path="/users" component={Users} exact/>
        <Route path="/users/:usersId/UserPlaces" component={UserPlaces} exact/>
        <Route path="/place/new" component={NewPlace} exact/>
        <Route path="/place/:placeId" component={UpdatePlace} exact/>
        <Redirect to="/"/>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/users" component={Users} exact/>
        <Route path="/users/:usersId/UserPlaces" component={UserPlaces} exact/>
        <Route path="/auth" component={Auth} exact/>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}
  >
    <Router>
      <MainNavigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
      </main>
    </Router>
  </AuthContext.Provider>
}

export default App;
