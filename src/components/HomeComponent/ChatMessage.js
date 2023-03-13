import React, {useContext} from "react";
import { AuthContext } from "../../shared/context/auth-context";

export default function ChatMessage(props){
    const auth = useContext(AuthContext)

    return props.messagesArray?.map(data => <div className={`${data.idOwner === auth.userId && "class-myMessage"}  class-message`}>
        {data.messageChat}
    </div>)
}