import React from "react";
import UsersList from "../../components/UIElements/UserList";

const Users = () => {
    const TEMP_USER_DBA = [
        {
            id:"asfwrgrgvdbdfbdb",
            name:"layla",
            email:"layla125@gmail.com",
            password:"123456789",
            image:"https://ami.animecharactersdatabase.com/uploads/chars/67961-1721145809.jpg",
            places:3
        },
        {
            id:"asfwrgrgvdbdfbdb",
            name:"shin",
            email:"shin247@gmail.com",
            password:"123456789",
            image:"https://data.whicdn.com/images/311102976/original.jpg",
            places:5
        },
        {
            id:"asfwrgrgvdbdfbdb",
            name:"takumi",
            email:"trapness@gmail.com",
            password:"123456789",
            image:"https://www.nautiljon.com/images/manga_persos/00/13/1131.jpg",
            places:3
        }
    ]

    return <div className="class-User">
        <h1>Users</h1>
        <UsersList item={TEMP_USER_DBA}/>
    </div>
}

export default Users;