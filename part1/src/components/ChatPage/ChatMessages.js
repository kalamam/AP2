import Message from "./Message";
import "./ChatMessages.css"
import {useState} from "react";

const getChatMessages = async (chatID, token, user) => {
    console.log(chatID);
    console.log(token);
    const response = await fetch("http://localhost:5000/api/Chats/" + chatID + "/Messages", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "*/*"
        }
    });
    const res = await response.json();
    if(res.length === 0){
        const currentDate = new Date();
        const timestamp = currentDate.toISOString();
        res = [{"id" : 1,
        "created" : timestamp,
        "sender" : {
        "username" : user.username
        },
        "content" : "No messages"}]
    }
    console.log(res);
    return await res;
}

export {getChatMessages};