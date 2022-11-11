import React, { useState, useContext } from 'react';
import Input from '../../components/UIElements/InputComponent';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ModalComponent from '../../components/UIElements/ModalComponent';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../components/UIElements/ImageUpload';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    console.log(formState.inputs)

    if(isLoginMode){
        try{
          const responseData = await sendRequest(
            process.env.REACT_APP_ + "users/login",
            'POST',
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
            {
              'Content-Type': 'application/json'
            },
          );

          auth.login(responseData.userId, responseData.token);
        } catch(err) {

        }

    } else {
      try {
        const formData = new FormData()
        formData.append('name',formState.inputs.name.value)
        formData.append('email',formState.inputs.email.value)
        formData.append('password',formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value)

        const responseData = await sendRequest(
          process.env.REACT_APP_ + "users/signup",
          'POST',
          formData
        )

        auth.login(responseData.userId, responseData.token);
        console.log("formData",formData)

      } catch (err) {}
    }
  };

  return (
    <>
      <ModalComponent
        headerTitle='You can not access for now'
        show={error}
        onCancel={clearError}
      >
        {error}
      </ModalComponent>
      <div className="authentication">
        {isLoading && <h1>Loading...</h1>}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <>
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <ImageUpload
                id="image"
                onInput={inputHandler}
                errorText="please provide us an image"
              />
            </>
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <button disabled={isLoginMode ? !formState.isValid : false}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </button>
        </form>
        <button onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </button>
      </div>
    </>
  );
};

export default Auth;
