import React, {useContext, useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function ImageAvatars() {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const [getUser, setGetUser] = useState(null)

  useEffect(()=>{
    const getUserFunction = async () => {
      if(auth.rol === "638f3dc51af87455b52cf7d4"){
        const response = await sendRequest(process.env.REACT_APP_ + 'doctor/'+ auth.userId);
        console.log("response",response)
        setGetUser(response);
      }
      if(auth.rol === "638f3ddd1af87455b52cf7d7"){
        const response = await sendRequest(process.env.REACT_APP_ + 'paciente/' + auth.userId);
        console.log("response",response)
        setGetUser(response);
      }
    }
    getUserFunction()
  },[sendRequest,auth.rol,auth.userId])

  console.log("getUser",getUser)

  return (
    <Stack direction="row" spacing={2} className="class-ImageAvatars">
        {auth.isLoggedIn ? (
            <Link to="/SeeAccount/:pacienteId">
              <span>
                <h4>Welcome</h4>
                <h5><span>{getUser?.getDoctorById ? getUser.getDoctorById.name : getUser?.getPacienteById ? getUser.getPacienteById.name : "User Name"}</span></h5>
                <span onClick={auth.logout}>Log Out</span>
              </span>
              <Avatar alt="User Name" src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg" />
            </Link>
        ) : (
          <>
            <Link to="/">
              <h5>Login</h5>
            </Link>
          </>
        )}
    </Stack>
  );
}
