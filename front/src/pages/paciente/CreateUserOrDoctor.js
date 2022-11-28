import React, { useEffect, useState } from "react";
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormUserDataCreateUser from "../../components/paciente/FormUserDataCreateUser";
import AddDayAndTimeWork from "../../components/paciente/AddDayAndTimeWork";


export default function CreateUserOrDoctor() {
    const [step, setStep] = useState(true);
    const [name ] = useState("")
    // setName

    useEffect(()=>{
        localStorage.removeItem("stepLS")
    },[step])

    return <div className={step ? "class-CreateUser" : "class-CreateUser class-CreateDoctor"}>
        <span>
            <FormControl>
                <label>Elige tu medico de preferencia, fecha y hora de la cita</label>
                <BasicButtons
                    onClick={()=>setStep(true)}
                    variantName="contained"
                    buttonName="Paciente"
                    className=""
                />
                <BasicButtons
                    onClick={()=>setStep(false)}
                    variantName="contained"
                    buttonName="Doctor/a"
                    className=""
                />
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
        <FormUserDataCreateUser pacienteOrDoctor={step}/>
        {!step && <AddDayAndTimeWork/>}
        <BasicButtons
            onClick={()=>{}}
            variantName="contained"
            buttonName="Listo"
            iconName={faCheck}
        />
    </div>
}