import React from "react";
import UsersItem from "./UsersItem";
import BasicCardMUI from "./BasicCard-MUI";
import BasicButtons from './BasicButtons-MUI';

const UsersList = (props) => {
    if(props.item.length === 0 || !(props.item)){
        return <BasicCardMUI
        className="class-cardNotFound"
        data={[
            {
                info:"No users found",
                variant:"h5",
                component:"div"
            },
            {
                info:"Info esplained why no users found",
                variant:"body2",
                component:"div"
            }
        ]}
        cardAction={
            <BasicButtons
                spacing={2}
                variantName="contained"
                buttonName="Go to home page"
            />
        }
        />
    }
    return <div>
        {props.item.map((user,key) => (
            <UsersItem
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                image={user.image}
                places={user.places}
            />
        ))}
    </div>
}

export default UsersList;