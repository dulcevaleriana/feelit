import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/UIElements/InputComponent';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from '../../shared/context/auth-context';
import ModalComponent from '../../components/UIElements/ModalComponent';
import ImageUpload from '../../components/UIElements/ImageUpload';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

    const [formState, inputHandler] = useForm({
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        },
        address: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        },
        creator: {
          value: auth.userId,
          isValid: true
        }
    },
    false
    )

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try{
      console.log(formState.inputs) // send this to backend

      const formData = new FormData()

      formData.append('title',formState.inputs.title.value)
      formData.append('description',formState.inputs.description.value)
      formData.append('address',formState.inputs.address.value)
      formData.append('creator',formState.inputs.creator.value)
      formData.append('image',formState.inputs.image.value)

      await sendRequest(
        'http://localhost:5000/api/places/',
        'POST',
        formData
      )
      history.push('/')
    }catch(err){}
  }

  return (
    <React.Fragment>
      <ModalComponent
        headerTitle='You can not access for now'
        show={error}
        onCancel={clearError}
      >
        {error}
      </ModalComponent>
      <form className="place-form" onSubmit={placeSubmitHandler}>
          {isLoading && <h1>Loading...</h1>}
          <h2>Create places</h2>
          <ImageUpload
              id="image"
              onInput={inputHandler}
              errorText="please provide us an image"
          />
          <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
          />
          <Input
              id="address"
              element="input"
              type="text"
              label="address"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid address."
              onInput={inputHandler}
          />
          <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (at least 5 characters)."
              onInput={inputHandler}
          />
          <button type="submit" disabled={!formState.isValid}>
              ADD PLACE
          </button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
