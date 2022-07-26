import React from "react";
import { NavLink } from "react-router-dom";

const NavsLinks = (props) => {
    return <nav>
        <ul className={props.className}>
            <li>
                <NavLink to="/consultaRapida/Create" exact>Consulta Rapida</NavLink>
            </li>
            <li>
                <NavLink to="/users" exact>All User</NavLink>
            </li>
            <li>
                <NavLink to="/ul/places">My Plases</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">Add Place</NavLink>
            </li>
            <li>
                <NavLink to="/auth">Authenticate</NavLink>
            </li>
        </ul>
    </nav>
}

export default NavsLinks;