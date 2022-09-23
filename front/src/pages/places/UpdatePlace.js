import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../components/UIElements/InputComponent';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import BasicButtons from '../../components/UIElements/BasicButtons-MUI';
import { useForm } from '../../shared/hooks/form-hook';

const UpdatePlace = props => {
    const getPlaceId = useParams().placeId;

    const DUMMY_PLACES = [
        {
            id:"q1",
            image:"https://wallpaperaccess.com/full/3111159.jpg",
            title:"Paradise Island",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            address:"Street 00, Country name",
            creatorId:"w2",
            location:{
                lat: 40.7484405,
                lng: -73.9878584
            }
        },
        {
            id:"q2",
            image:"https://images.hdqwalls.com/wallpapers/beautiful-scenery-landscape-4k-c9.jpg",
            title:"Rainbow Mountain",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            address:"Street 00, Country name",
            creatorId:"w2",
            location:{
                lat: 40.7484405,
                lng: -73.9878584
            }
        },
        {
            id:"q3",
            image:"https://wallpapercave.com/wp/wp8284180.jpg",
            title:"Pupple Park",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            address:"Street 00, Country name",
            creatorId:"w3",
            location:{
                lat: 40.7484405,
                lng: -73.9878584
            }
        }
    ]

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
        }
    },true)

    const getPlaceDataById = DUMMY_PLACES.find(p => p.id === getPlaceId);

    useEffect(()=>{
        setFormData({
            title: {
                value: getPlaceDataById.title,
                isValid: true
            },
            address: {
                value: getPlaceDataById.address,
                isValid: true
            },
            description: {
                value: getPlaceDataById.description,
                isValid: true
            }
        },true)
    },[getPlaceDataById,setFormData])

    if(!getPlaceDataById){
        return <div>
            <h2>We dont find this place to edit!</h2>
        </div>
    }

    const updatePlace = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    return formState.inputs.title.value ? <form onSubmit={updatePlace}>
        <h2>UpdatePlace {getPlaceId}</h2>
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            value={formState.inputs.title.value}
            isValid={formState.inputs.title.isValid}
        />
        <Input
            id="address"
            element="input"
            type="text"
            label="address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
            value={formState.inputs.address.value}
            isValid={formState.inputs.description.isValid}
        />
        <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            value={formState.inputs.description.value}
            isValid={formState.inputs.description.isValid}
        />
        <button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
        </button>
        <BasicButtons
            to="/users/w2/UserPlaces"
            buttonName="Cancel"
            onClick={()=>{}}
            variantName="contained"
        />
    </form>
    :
    <h1>loading</h1>
}

export default UpdatePlace;