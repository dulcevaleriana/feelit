import React from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const NavsLinks = (props) => {
    return <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
        <nav>
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
        </CSSTransition>
}

export default NavsLinks;