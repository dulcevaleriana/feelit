import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return <div>
        Home
        <br/>
        <Link to="/AgendarCita/EditOrSeeDetails">/AgendarCita/EditOrSeeDetails</Link>
        <br/>
        <Link to="/EnviarResultados/EditOrSeeDetails">/EnviarResultados/EditOrSeeDetails</Link>
        <br/>
    </div>
}