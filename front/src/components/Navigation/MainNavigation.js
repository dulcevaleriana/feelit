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

    const arrayLinks_isLoggedIn_Doctor_true = [
        {
            to:"/AgendarCita/create",
            name:"Agendar Cita",
        },
        {
            to:"/consultaRapida/ReadConsultaRapida",
            name:"Gestionar Consultas",
        }
    ]
    const arrayLinks_isLoggedIn_Paciente_true = [
        {
            to:"/consultaRapida/Create",
            name:"Consulta Flash",
        },
        {
            to:"/AgendarCita/create",
            name:"Agendar Cita",
        },
        {
            to:"/EnviarResultados/create",
            name:"Enviar Resultados",
        }
    ]

    const arrayLinks_isLoggedIn_flase = [
        {
            to:"/consultaRapida/Create",
            name:"Consulta Flash",
        },
        {
            to:"/AgendarCita/create",
            name:"Agendar Cita",
        },
        {
            to:"/EnviarResultados/create",
            name:"Enviar Resultados",
        }
    ]

    return <React.Fragment>
        <Header className="class-MainNavigation">
            {matches && (displayMenu ? <CloseIcon onClick={() => setDisplayMenu(!displayMenu)}/> : <MenuIcon onClick={() => setDisplayMenu(!displayMenu)}/> )}
            <h1>
                <Link to={auth.isLoggedIn ? "/" : "/Home"}>Feelit</Link>
            </h1>
            <NavsLinks
                show={matches ? displayMenu : true}
                className={matches && displayMenu ? " class-responsive class-NavsLinks " : " class-NavsLinks "}
                arrayLinks={(auth.isLoggedIn && auth.rol === "638f3dc51af87455b52cf7d4") ? arrayLinks_isLoggedIn_Doctor_true : (auth.isLoggedIn && auth.rol === "638f3ddd1af87455b52cf7d7") ? arrayLinks_isLoggedIn_Paciente_true : arrayLinks_isLoggedIn_flase}
                onClick={() => setDisplayMenu(false)}
            />
            <ImageAvatars />
        </Header>
    </React.Fragment>
}

export default MainNavigation;