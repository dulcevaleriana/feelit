import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Note: variant only can be:
// "text"
// "contained"
// "outlined"

export default function BasicButtons(props) {
  return (
    <Stack spacing={props.spacing} direction="row">
      <Button variant={props.variantName} onClick={props.onClick}>
        <span>{props.buttonName}</span>
        {props.iconName && <FontAwesomeIcon icon={props.iconName} size="lg"  />}
      </Button>
    </Stack>
  );
}
