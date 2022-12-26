import React, {useContext} from "react";
import { AuthContext } from '../../shared/context/auth-context';
import ImageServices from '../../Image/undraw_vr_chat_re_s80u.png';
import Typography from '@mui/material/Typography';
import BasicButtons from "../UIElements/BasicButtons-MUI";

export default function ChatMessageServices(){
    const auth = useContext(AuthContext);

    let element = auth.rol === undefined ? <div>
        <img src={ImageServices} alt={ImageServices}/>
        <Typography variant="h6" color="text.secondary">
            Mensaje de bienvenida
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Contenido Contenido Contenido Contenido Contenido Contenido Contenido
        </Typography>
    </div>
    :
    <div className="class-ChatMessageServices">
        <div>
            <Typography variant="h6" color="text.secondary">
                Detalle solicitud:
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Consulta rapida <br/>
                0:00 PM <br/>
                RD$500 || Estado: Pagado
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Mensaje: <br/>
                Hola Dr. atiendame porfa, Hola Dr. atiendame porfa,
                Hola Dr. atiendame porfa, Hola Dr. atiendame porfa,
                Hola Dr. atiendame porfa, Hola Dr. atiendame por...
            </Typography>
        </div>
        {auth.rol === "638f3ddd1af87455b52cf7d7" ? <Typography variant="body2" color="text.secondary">
            Pending
        </Typography>
        : auth.rol === "638f3dc51af87455b52cf7d4" ? <div>
            <BasicButtons
                onClick={()=>{}}
                variantName="outlined"
                buttonName={"Declinar"}
            />
            <BasicButtons
                onClick={()=>{}}
                variantName="contained"
                buttonName={"Aceptar"}
            />
        </div>
        : null
        }
    </div>

    return element;
}