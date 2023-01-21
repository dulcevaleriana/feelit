import React, { useEffect , useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../components/UIElements/InputComponent';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import BasicButtons from '../../components/UIElements/BasicButtons-MUI';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from '../../shared/context/auth-context';
import ModalComponent from '../../components/UIElements/ModalComponent';
import ImageUpload from '../../components/UIElements/ImageUpload';

const UpdatePlace = props => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedPlace, setLoadedPlace ] = useState();
    const getPlaceId = useParams().placeId;
    const history = useHistory();


    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
    },true)

    useEffect(()=>{
        const fetchPlace = async () => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_ + `places/${getPlaceId}`);

                setLoadedPlace(responseData.place)

                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    address: {
                        value: responseData.place.address,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    },
                    image: {
                      value: responseData.place.image,
                      isValid: true
                    }
                },true)
            }catch(err){}
        }
        fetchPlace();
    },[sendRequest, getPlaceId, setFormData, history])

    if(!loadedPlace && !error){
        return <div>
            <h2>We dont find this place to edit!</h2>
        </div>
    }

    const updatePlace = async event => {
        event.preventDefault();
        try{
            const formData = new FormData()

            formData.append('title',formState.inputs.title.value)
            formData.append('address',formState.inputs.address.value)
            formData.append('description',formState.inputs.description.value)
            formData.append('image',formState.inputs.image.value)

            await sendRequest(
                process.env.REACT_APP_ + `places/${getPlaceId}`,
                'PATCH',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            )

            history.push('/users/' + auth.userId + '/UserPlaces');
        }catch(err){}
    }

    return <React.Fragment>
        <ModalComponent
            headerTitle='You can not access for now'
            show={error}
            onCancel={clearError}
        >
            {error}
        </ModalComponent>
        {isLoading && <h1>loading</h1>}
        {!isLoading && loadedPlace && <form onSubmit={updatePlace}>
        <h2>UpdatePlace {getPlaceId}</h2>
        <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="please provide us an image"
            imageValue={loadedPlace.image}
        />
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={loadedPlace.title}
            isValid={true}
        />
        <Input
            id="address"
            element="input"
            type="text"
            label="address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
            value={loadedPlace.address}
            isValid={true}
        />
        <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            value={loadedPlace.description}
            isValid={true}
        />
        <button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
        </button>
        <BasicButtons
            to={`/users/${auth.userId}/UserPlaces`}
            buttonName="Cancel"
            variantName="contained"
        />
    </form>}
    </React.Fragment>
}

export default UpdatePlace;