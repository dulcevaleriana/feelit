import React, { useReducer, useEffect, useState } from 'react';
import { validate } from '../../shared/util/validators';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import BasicSelect from './BasicSelect';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const inputReducer = (state, action) => {

  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {
  const [data, setData] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
    isValid: props.isValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const functionMask = (event, text) => {
    const arrayMask = text.split("");
    const arrayEvent = event.split("");
    let countMin = event.length - 1;
    let countMax = text.length;

    if(countMin <= (countMax - 1)) {

      if(arrayMask[countMin] === "-" && arrayEvent[countMin] !== "-"){
        let arrEvent = event.split("");
        arrEvent.splice((countMin), 0, arrayMask[countMin])
        setData(arrEvent.join(''))
        props.passData(arrEvent.join(''))
      } else {
        setData(event)
        props.passData(event)
      }
    }
  }

  const element =
    props.element === 'input' ? (
      <FormControl className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <InputLabel htmlFor="component-outlined">{props.label}</InputLabel>
        <OutlinedInput
          id={props.id}
          type={props.type}
          value={props.value ? props.value : inputState.value}
          onChange={changeHandler}
          label={props.label}
          onBlur={touchHandler}
          placeholder={props.placeholder}
        />
      </FormControl>
    ) : props.element === 'select' ? (
      <FormControl>
        <InputLabel htmlFor="component-outlined">{props.label}</InputLabel>
        <BasicSelect
          id={props.id}
          value={props.value ? props.value : inputState.value}
          onChange={changeHandler}
          name={props.placeholder}
          filterArray={props.filterArray}
        />
      </FormControl>
    ) : props.element === 'password' ? (
      <OutlinedInput
        id={props.id}
        label={props.label}
        type={showPassword ? 'text' : 'password'}
        value={props.value ? props.value : inputState.value}
        onChange={changeHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={()=>setShowPassword(!showPassword)}
              onMouseDown={(event)=>event.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    ) : props.element === 'mask' ?  (
      <FormControl className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <InputLabel htmlFor="component-outlined">{props.label}</InputLabel>
        <OutlinedInput
          id={props.id}
          type={props.type}
          value={props.value ? props.value : data}
          onChange={(e)=>functionMask(e.target.value,props.mask)}
          label={props.label}
          onBlur={touchHandler}
          placeholder={props.placeholder}
        />
      </FormControl>
    ):(
      <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={props.value ? props.value : inputState.value}
        />
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
      </div>
    );

    return element;

};

export default Input;
