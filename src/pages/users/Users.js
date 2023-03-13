import React, { useEffect, useState } from "react";
import UsersList from "../../components/UIElements/UserList";
import ModalComponent from '../../components/UIElements/ModalComponent';
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await sendRequest(process.env.REACT_APP_ + 'users');

                setLoadedUsers(response.users);
            } catch(err){}
        }
        fetchUsers();
    },[sendRequest]);

    return isLoading ? (<h1>Loading...</h1>) : (<React.Fragment>
        <ModalComponent
            headerTitle='You can not access for now'
            show={error}
            onCancel={clearError}
        >
            {error}
        </ModalComponent>
        <div className="class-User">
            <h1>Users</h1>
            {loadedUsers && <UsersList item={loadedUsers}/>}
        </div>
    </React.Fragment>)
}

export default Users;