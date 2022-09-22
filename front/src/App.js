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
// import Auth from './pages/users/Auth';

const App = () => {
  return <Router>
    <MainNavigation />
    <main>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/consultaRapida/Create" component={ConsultaRapida} exact/>
        <Route path="/users" component={Users} exact/>
        <Route path="/users/:usersId/UserPlaces" component={UserPlaces} exact/>
        <Route path="/place/new" component={NewPlace} exact/>
        <Route path="/place/:placeId" component={UpdatePlace} exact/>
        {/* <Route patch="/login" component={Auth} exact/> */}
        <Redirect to="/"/>
      </Switch>
    </main>
  </Router>;
}

export default App;
