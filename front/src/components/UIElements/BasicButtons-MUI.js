import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

// Note: variant only can be:
// "text"
// "contained"
// "outlined"

export default function BasicButtons(props) {
  if(props.to){
    return <Stack spacing={props.spacing} direction="row">
      <Link to={props.to}>
        <Button variant={props.variantName} onClick={props.onClick} disabled={props.disabled} type={props.type}>
          <span>{props.buttonName}</span>
          {props.iconName && <FontAwesomeIcon icon={props.iconName} size="lg"  />}
        </Button>
      </Link>
    </Stack>
  }
  return (
    <Stack spacing={props.spacing} direction="row">
      <Button variant={props.variantName} onClick={props.onClick} disabled={props.disabled}>
        <span>{props.buttonName}</span>
        {props.iconName && <FontAwesomeIcon icon={props.iconName} size="lg"  />}
      </Button>
    </Stack>
  );
}
