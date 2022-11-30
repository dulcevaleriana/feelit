import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import AddDayAndTimeWork from "../../components/paciente/AddDayAndTimeWork";


export default function EditUserOrDoctor() {
    const [name ] = useState("")
    // setName
    const boolean = useParams().pacienteOrDoctor
    const history = useHistory();

    console.log("pacienteOrDoctor",boolean)

    return <div className={boolean === true ? "class-CreateUser class-editUser" : "class-CreateUser class-CreateDoctor class-editUser"}>
        <span>
            <FormControl>
                <label>Este es tu tipo de usuario:</label>
                <h5>{boolean === true ? "paciente" : "Doctor"}</h5>
            </FormControl>
            <div>
                <div>
                    <img
                        src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"
                        alt=""
                    />
                </div>
                <BasicButtons
                    onClick={()=>{}}
                    variantName="contained"
                    className=""
                    iconName={faCamera}
                />
            </div>
            <FormControl>
                <InputLabel htmlFor="component-outlined">Nombre</InputLabel>
                <OutlinedInput
                id="component-outlined"
                value={name}
                onChange={()=>{}}
                label="Nombre"
                />
            </FormControl>
        </span>
        <FormUserDataCreateUser pacienteOrDoctor={boolean !== true}/>
        {boolean !== true && <AddDayAndTimeWork/>}
        <BasicButtons
            onClick={()=>history.push("/SeeAccount/:pacienteId")}
            variantName="contained"
            buttonName="Listo"
            iconName={faCheck}
        />
    </div>
}