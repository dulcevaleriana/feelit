import React, {useState} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckBox(props){
    const [state, setState] = useState(false);

      const handleChange = (event) => {
        setState(!state);
      };

    return (
        <div>
          <FormControlLabel
            control={
              <Checkbox checked={state} onChange={handleChange} name={props.name} />
            }
            label={props.name}
          />
        </div>
    )
}