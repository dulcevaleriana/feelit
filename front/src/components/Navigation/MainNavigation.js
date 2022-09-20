import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import NavsLinks from "./NavsLinks";
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ImageAvatars from "../../components/UIElements/ImageAvatars";

const MainNavigation = (props) => {
    const [displayMenu, setDisplayMenu] = useState(false)
    const matches = useMediaQuery('(max-width:992px)');

    const arrayLinks = [
        {
            to:"/consultaRapida/Create",
            name:"Consulta Rapida",
        },
        {
            to:"/users",
            name:"All User",
        },
        {
            to:"/w2/UserPlaces",
            name:"User's places",
        },
        {
            to:"/place",
            name:"Create Places",
        }
    ]

    return <React.Fragment>
        <Header className="class-MainNavigation">
            {matches && (displayMenu ? <CloseIcon onClick={() => setDisplayMenu(!displayMenu)}/> : <MenuIcon onClick={() => setDisplayMenu(!displayMenu)}/> )}
            <h1>
                <Link to="/">Feelit</Link>
            </h1>
            <NavsLinks
                show={matches ? displayMenu : true}
                className={matches && displayMenu ? " class-responsive class-NavsLinks " : " class-NavsLinks "}
                arrayLinks={arrayLinks}
                onClick={() => setDisplayMenu(false)}
            />
            <Link to="/login">
                <ImageAvatars />
            </Link>
        </Header>
    </React.Fragment>
}

export default MainNavigation;