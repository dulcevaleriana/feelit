import React, { useState, useContext } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import NavsLinks from "./NavsLinks";
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ImageAvatars from "../../components/UIElements/ImageAvatars";
import { AuthContext } from "../../shared/context/auth-context";

const MainNavigation = (props) => {
    const [displayMenu, setDisplayMenu] = useState(false)
    const matches = useMediaQuery('(max-width:992px)');
    const auth = useContext(AuthContext);

    const arrayLinks_isLoggedIn_true = [
        {
            to:"/consultaRapida/Create",
            name:"Consulta Flash",
        },
        {
            to:"/consultaRapida/ReadConsultaRapida",
            name:"Mi lista de Consulta Flash",
        },
        {
            to:"/users",
            name:"All User",
        },
        {
            to:`/users/${auth.userId}/UserPlaces`,
            name:"User's places",
        },
        {
            to:"/place/new",
            name:"Create Places",
        }
    ]

    const arrayLinks_isLoggedIn_flase = [
        {
            to:"/users",
            name:"All User",
        },
        {
            to:"/users/w2/UserPlaces",
            name:"User's places",
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
                arrayLinks={auth.isLoggedIn ? arrayLinks_isLoggedIn_true : arrayLinks_isLoggedIn_flase}
                onClick={() => setDisplayMenu(false)}
            />
            {auth.isLoggedIn ? (
                <button onClick={auth.logout}>LOGOUT</button>
            ) : (
                <Link to="/auth">
                    <ImageAvatars />
                </Link>
            )}
        </Header>
    </React.Fragment>
}

export default MainNavigation;