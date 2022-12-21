import React, {useContext} from "react";
import { AuthContext } from '../../shared/context/auth-context';
import ImageServices from '../../Image/undraw_vr_chat_re_s80u.png';
import Typography from '@mui/material/Typography';

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
    </div> : <div>
        ChatMessageServices
    </div>

    return element;
}