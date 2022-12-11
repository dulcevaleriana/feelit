import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";

export default function Home() {
    const auth = useContext(AuthContext);
    console.log("auth",auth)

    return <div>
        Home
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
        <br/>
    </div>
}