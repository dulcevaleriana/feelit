import React, { useContext, useEffect, useState } from 'react';
import PlaceList from '../../components/UsersComponent/PlaceList';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";
import ModalComponent from '../../components/UIElements/ModalComponent';

const UserPlaces = (props) => {
    const [placeData, setPlaceData] = useState();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const onDeletePlacesHandle = deletedPlaceId => {
        setPlaceData(prevPlaces => prevPlaces.filter(places => places.id !== deletedPlaceId))
    }

    useEffect(()=>{
        const getPlaceByUserData = async () =>{
            try{
                const responsePlaceData = await sendRequest(`http://localhost:5000/api/places/user/${auth.userId}`)
                setPlaceData(responsePlaceData.place)
            }catch(err){}
        }
        getPlaceByUserData();
    },[sendRequest,auth.userId])

    console.log("placeData",placeData)

    return (
        <React.Fragment>
            <ModalComponent
                headerTitle='You can not access for now'
                show={error}
                onCancel={clearError}
            >
                {error}
            </ModalComponent>
            {isLoading ? (
                <h1>oading...</h1>
            ) : (
                <div>
                    UserPlaces {auth.userId}
                    {placeData && <PlaceList items={placeData} onDeletePlaces={onDeletePlacesHandle}/>}
                </div>
            )}
        </React.Fragment>
    )
}

export default UserPlaces;