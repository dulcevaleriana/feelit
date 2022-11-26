import React, {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

export default function ImageAvatars() {
  const auth = useContext(AuthContext);

  return (
    <Stack direction="row" spacing={2} className="class-ImageAvatars">
        {auth.isLoggedIn ? (
            <Link to="/" onClick={auth.logout}>
              <span>
                <h4>Welcome</h4>
                <h5>Remy Sharp</h5>
              </span>
              <Avatar alt="Remy Sharp" src="https://th-thumbnailer.cdn-si-edu.com/5a79C6jJ8BrChMX5tgEKiMI_qqo=/1000x750/filters:no_upscale():focal(792x601:793x602)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/52/e4/52e44474-c2dc-41e0-bb77-42a904695196/this-image-shows-a-portrait-of-dragon-man-credit-chuang-zhao_web.jpg" />
            </Link>
        ) : (
          <>
            <Link to="/auth">
              <h5>Login</h5>
              <Avatar alt="Remy Sharp" src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png" />
            </Link>
          </>
        )}
    </Stack>
  );
}
