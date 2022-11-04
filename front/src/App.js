import React, { useState, useCallback, useEffect } from 'react';
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

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDates, setTokenExpirationDates] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDates(tokenExpirationDate);
    localStorage.setItem('useData',JSON.stringify(
      {
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      }
    ))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDates(null);
    setUserId(null);
    localStorage.removeItem('useData')
  }, []);

  useEffect(()=>{
    if(token && tokenExpirationDates){
      const remainingTime = tokenExpirationDates.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer);
    }
  },[token, logout, tokenExpirationDates])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('useData'))
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  },[login])

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
