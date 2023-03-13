import React from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const NavsLinks = (props) => {
    return <div>
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
        <nav>
            <ul className={props.className}>
                {props.arrayLinks.map((index,key)=>(
                    <li onClick={props.onClick} key={key}>
                        <NavLink to={index.to}>{index.name}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
        </CSSTransition>
    </div>
}

export default NavsLinks;