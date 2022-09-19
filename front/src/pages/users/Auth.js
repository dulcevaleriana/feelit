import React, {useState} from 'react';
import Box from '@mui/material/Box';
import BasicButtons from "../../components/UIElements/BasicButtons-MUI";

const Auth = (props) => {
    // const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // const authSubmitHandler = async event => {
  //   event.preventDefault();
  //   auth.login();
  // }

    return (
        <Box className="authentication">
          <h2>Login Required</h2>
          <hr />
          <form>
            {!isLoginMode && (
              <input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                // validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                // onInput={inputHandler}
              />
            )}
            <input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
            //   validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
            //   onInput={inputHandler}
            />
            <input
              element="input"
              id="password"
              type="password"
              label="Password"
            //   validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password, at least 5 characters."
            //   onInput={inputHandler}
            />
            <BasicButtons type="submit" onClick={()=>setIsLoginMode(!isLoginMode)}>
            {/* disabled={!formState.isValid} */}
              {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </BasicButtons>
          </form>
          <BasicButtons inverse >
          {/* onClick={switchModeHandler} */}
            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
          </BasicButtons>
        </Box>
      );
}

export default Auth;