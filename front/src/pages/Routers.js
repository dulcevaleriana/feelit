import React, { lazy } from "react";
import { BrowserRouter as Redirect, Route, Switch } from 'react-router-dom';

import EditOrSeeDetailsComponent from './consultasRapidas/EditOrSeeDetailsComponent';
import AgendarCita from './agendarCita/AgendarCita';
import EnviarResultados from './EnviarResultados/EnviarResultados';
import EditOrSeeAgendarCita from './agendarCita/EditOrSeeAgendarCita';
import EditOrSeeEnviarResultados from '../components/EnviarResultados/EditOrSeeEnviarResultados';
import CreateUserOrDoctor from './paciente/CreateUserOrDoctor';
import SeeAccount from './paciente/SeeAccount';
import EditUserOrDoctor from './paciente/EditUserOrDoctor';
import AuthDoctorOrPaciente from './paciente/AuthDoctorOrPaciente';
import ConsultaRapida from './consultasRapidas/ConsultaRapida';
import ReadConsultaRapida from './consultasRapidas/ReadConsultaRapida';

const Home = lazy(() => import('./Home'));
const Users = lazy(() => import('./users/Users'));
const UserPlaces = lazy(() => import('./users/UserPlaces'));
const NewPlace = lazy(() => import('./places/NewPlace'));
const UpdatePlace = lazy(() => import('./places/UpdatePlace'));
const Auth = lazy(() => import('./users/Auth'));

export default function Routers(props){

    return props.token ? (
        <>
            <Switch>
                { props.rol === "638f3dc51af87455b52cf7d4" ? (
                <>
                {/* Doctor's views */}
                    <Route path="/consultaRapida/ReadConsultaRapida" component={ReadConsultaRapida} exact/>
                    <Route path="/consultaRapida/EditOrSeeDetails" component={EditOrSeeDetailsComponent} exact/>
                    <Route path="/AgendarCita/create" component={AgendarCita} exact />
                    <Route path="/AgendarCita/EditOrSeeDetails" component={EditOrSeeAgendarCita} exact />
                    <Route path="/EnviarResultados/EditOrSeeDetails" component={EditOrSeeEnviarResultados} exact />
                    <Route path="/" component={Home} exact/>

                    <Route path="/SeeAccount/:pacienteId" component={SeeAccount} exact />
                    <Route path="/EditUserOrDoctor" component={EditUserOrDoctor} exact />
                    <Redirect to="/"/>
                </>
                )
                :
                props.rol === "638f3ddd1af87455b52cf7d7" ? (
                <>
                {/* Paciente's views */}
                    <Route path="/consultaRapida/Create" component={ConsultaRapida} exact/>
                    <Route path="/AgendarCita/create" component={AgendarCita} exact />
                    <Route path="/EnviarResultados/create" component={EnviarResultados} exact />
                    <Route path="/" component={Home} exact/>

                    <Route path="/SeeAccount/:pacienteId" component={SeeAccount} exact />
                    <Route path="/EditUserOrDoctor" component={EditUserOrDoctor} exact />
                    <Redirect to="/"/>
                </>
                ) : null}
            </Switch>
        </>
    )
    :
    (
        <>
            <Switch>
              <Route path="/CreateUserOrDoctor" component={CreateUserOrDoctor} exact />
              <Route path="/Home" component={Home} exact/>
              <Route path="/consultaRapida/Create" component={ConsultaRapida} exact/>
              <Route path="/AgendarCita/create" component={AgendarCita} exact />
              <Route path="/EnviarResultados/create" component={EnviarResultados} exact />

              <Route path="/users" component={Users} exact/>
              <Route path="/users/:usersId/UserPlaces" component={UserPlaces} exact/>
              <Route path="/users" component={Users} exact/>
              <Route path="/users/:usersId/UserPlaces" component={UserPlaces} exact/>
              <Route path="/place/new" component={NewPlace} exact/>
              <Route path="/place/:placeId" component={UpdatePlace} exact/>
              <Route path="/authOLD" component={Auth} exact/>
              <Route path="/" component={AuthDoctorOrPaciente} exact/>
              <Redirect to="/"/>
            </Switch>
        </>
    )
}