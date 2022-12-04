import React, { useReducer, useEffect } from 'react';
import { validate } from '../../shared/util/validators';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import BasicSelect from './BasicSelect';

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

  const element =
    props.element === 'input' ? (
      <>
      <FormControl className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <InputLabel htmlFor="component-outlined">{props.label}</InputLabel>
        <OutlinedInput
          id={props.id}
          type={props.type}
          value={inputState.value}
          onChange={changeHandler}
          label={props.label}
          onBlur={touchHandler}
          placeholder={props.placeholder}
        />
      </FormControl>
      </>
    ) : props.element === 'select' ? (
      <FormControl>
        <label>{props.label}</label>
        <BasicSelect
          id={props.id}
          value={inputState.value}
          onChange={changeHandler}
          name={props.placeholder}
          filterArray={props.filterArray}
        />
      </FormControl>
    ) : (
      <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
      </div>
    );

    return element;

};

export default Input;
