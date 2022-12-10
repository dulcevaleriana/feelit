import React, { Suspense, lazy, useState, useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import MainNavigation from './components/Navigation/MainNavigation';
import "./scss/GlobalStyle.scss";

import ConsultaRapida from './pages/consultasRapidas/ConsultaRapida';
import ReadConsultaRapida from './pages/consultasRapidas/ReadConsultaRapida';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import EditOrSeeDetailsComponent from './pages/consultasRapidas/EditOrSeeDetailsComponent';
import AgendarCita from './pages/agendarCita/AgendarCita';
import EnviarResultados from './pages/EnviarResultados/EnviarResultados';
import EditOrSeeAgendarCita from './pages/agendarCita/EditOrSeeAgendarCita';
import EditOrSeeEnviarResultados from './components/EnviarResultados/EditOrSeeEnviarResultados';
import CreateUserOrDoctor from './pages/paciente/CreateUserOrDoctor';
import SeeAccount from './pages/paciente/SeeAccount';
import EditUserOrDoctor from './pages/paciente/EditUserOrDoctor';
import AuthDoctorOrPaciente from './pages/paciente/AuthDoctorOrPaciente';

const Home = lazy(() => import('./pages/Home'));
const Users = lazy(() => import('./pages/users/Users'));
const UserPlaces = lazy(() => import('./pages/users/UserPlaces'));
const NewPlace = lazy(() => import('./pages/places/NewPlace'));
const UpdatePlace = lazy(() => import('./pages/places/UpdatePlace'));
const Auth = lazy(() => import('./pages/users/Auth'));

const App = () => {
  const auth = useContext(AuthContext);
  const { token, login, logout, userId, rolDP } = useAuth();

  const [editConsultaRapida, setEditConsultaRapida] = useState(false);
  const [seeDetailConsultaRapida, setSeeDetailConsultaRapida] = useState(false);

  let routes;
  console.log("auth.rol",auth.rol)
  console.log("rolDP",rolDP)

  if (token) {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/consultaRapida/Create" component={ConsultaRapida} exact/>
        <Route path="/consultaRapida/ReadConsultaRapida" component={ReadConsultaRapida} exact/>
        <Route path="/consultaRapida/EditOrSeeDetails" component={EditOrSeeDetailsComponent} exact/>
        <Route path="/AgendarCita/create" component={AgendarCita} exact />
        <Route path="/AgendarCita/EditOrSeeDetails" component={EditOrSeeAgendarCita} exact />
        <Route path="/EnviarResultados/create" component={EnviarResultados} exact />
        <Route path="/EnviarResultados/EditOrSeeDetails" component={EditOrSeeEnviarResultados} exact />
        <Route path="/SeeAccount/:pacienteId" component={SeeAccount} exact />
        <Route path="/EditUserOrDoctor/:pacienteOrDoctor" component={EditUserOrDoctor} exact />

        <Route path="/users" component={Users} exact/>
        <Route path="/users/:usersId/UserPlaces" component={UserPlaces} exact/>
        <Route path="/place/new" component={NewPlace} exact/>
        <Route path="/place/:placeId" component={UpdatePlace} exact/>
        <Route path="/authOLD" component={Auth} exact/>
        <Redirect to="/"/>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/CreateUserOrDoctor" component={CreateUserOrDoctor} exact />

        <Route path="/" component={Home} exact/>
        <Route path="/users" component={Users} exact/>
        <Route path="/users/:usersId/UserPlaces" component={UserPlaces} exact/>
        <Route path="/auth" component={AuthDoctorOrPaciente} exact/>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      rol: rolDP,
      login: login,
      logout: logout,
      editConsultaRapida: editConsultaRapida,
      seeDetailConsultaRapida: seeDetailConsultaRapida,
      setEditConsultaRapida: setEditConsultaRapida,
      setSeeDetailConsultaRapida: setSeeDetailConsultaRapida
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
