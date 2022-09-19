import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../../components/UsersComponent/PlaceList';

const UserPlaces = (props) => {
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
    useParams()
    return (
        <div>
            UserPlaces
            <PlaceList items={DUMMY_PLACES}/>
        </div>
    )
}

export default UserPlaces;