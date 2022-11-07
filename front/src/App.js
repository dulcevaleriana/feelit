import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import "./scss/GlobalStyle.scss";

import Home from './pages/Home';
import Users  from './pages/users/Users';
import UserPlaces  from './pages/users/UserPlaces';
import NewPlace from './pages/places/NewPlace';
import UpdatePlace from './pages/places/UpdatePlace'
import ConsultaRapida from './pages/consultasRapidas/ConsultaRapida';
import Auth from './pages/users/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/consultaRapida/Create" component={ConsultaRapida} exact/>
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
      <main>{routes}</main>
    </Router>
  </AuthContext.Provider>
}

export default App;
