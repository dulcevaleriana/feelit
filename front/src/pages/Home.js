import React, {useContext} from "react";
// import { Link } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import ListChat from "../components/HomeComponent/listChat";
import CitasPendientes from "../components/HomeComponent/citasPendientes";
import UltimasConsultas from "../components/HomeComponent/ultimasConsultas";

export default function Home() {
    const auth = useContext(AuthContext);
    console.log("auth",auth)

    return <div className="class-Home">
        <ListChat/>
        <CitasPendientes/>
        <UltimasConsultas/>
        {/* Home
        <br/>
        <Link to="/AgendarCita/EditOrSeeDetails">/AgendarCita/EditOrSeeDetails</Link>
        <br/>
        <Link to="/EnviarResultados/EditOrSeeDetails">/EnviarResultados/EditOrSeeDetails</Link>
        <br/>
        <Link to="/users">All User</Link>
        <br/>
        <Link to={`/users/${auth.userId}/UserPlaces`}>User's places</Link>
        <br/>
        <Link to="/place/new">Create Places</Link>
        <br/> */}
    </div>
}