import React, {useState,useContext} from 'react';
import Input from '../../components/UIElements/InputComponent';
import { useForm } from '../../shared/hooks/form-hook';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ModalComponent from '../../components/UIElements/ModalComponent';

export default function AuthDoctorOrPaciente(){
  const auth = useContext(AuthContext);
  const [isPaciente, setIsPaciente] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const authSubmitHandler = async event => {
        event.preventDefault();

        if(isPaciente){
            try{
              const responseData = await sendRequest(
                process.env.REACT_APP_ + "paciente/login",
                'POST',
                JSON.stringify({
                  email: formState.inputs.email.value,
                  password: formState.inputs.password.value,
                }),
                {
                  'Content-Type': 'application/json'
                },
              );

              auth.login(responseData.userId, responseData.token, responseData.rol);
              console.log("responseData",responseData)
            } catch(err) {}

        } else {
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_ + "doctor/login",
              'POST',
              JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
              }),
              {
                'Content-Type': 'application/json'
              },
            )

            auth.login(responseData.userId, responseData.token, responseData.rol);
          } catch (err) {}
        }
      };

    return <>
        <ModalComponent
            headerTitle='You can not access for now'
            show={error}
            onCancel={clearError}
        >
        {error}
      </ModalComponent>
      <div className='class-AuthDoctorOrPaciente'>
            <form onSubmit={authSubmitHandler}>
                {isLoading && <h1>Loading...</h1>}
                <h1>Iniciar Sección como "Doctor/Paciente"</h1>
                <BasicButtons
                    onClick={()=>setIsPaciente(true)}
                    variantName={isPaciente === true ? "contained" : "outlined"}
                    buttonName="Soy Paciente"
                />
                <BasicButtons
                    onClick={()=>setIsPaciente(false)}
                    variantName={isPaciente === false ? "contained" : "outlined"}
                    buttonName="Soy Doctor"
                />
                <Input
                    element='input'
                    id='email'
                    type='text'
                    label="Correo"
                    validators={[]}
                    errorText="Debe poner una correo correcto"
                    onInput={inputHandler}
                />
                <Input
                    element='input'
                    id='password'
                    type='text'
                    label="Contraseñas"
                    validators={[]}
                    errorText='Debe poner una clave correcta'
                    onInput={inputHandler}
                />
                <BasicButtons
                    onClick={()=>{}}
                    variantName="contained"
                    buttonName="Iniciar seccion"
                    type="submit"
                />
            </form>
            <img src='https://cdn.pixabay.com/photo/2020/11/03/15/31/doctor-5710152_960_720.jpg' alt='imgs'/>
        </div>
    </>
}