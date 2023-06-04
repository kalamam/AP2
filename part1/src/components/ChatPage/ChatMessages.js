import Message from "./Message";
import "./ChatMessages.css"
import {useState} from "react";

const getMessages = async (chatID, token, messageId, user) => {
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
    for (const message of res) {
        console.log(message);
        const currentDate = new Date();
        const timestamp = currentDate.toISOString();
        if(messageId===message.id){
            const newMessage = {
                "sender": user.username,
                "type": "text",
                "text": message,
                "timestamp": timestamp,
            };
            console.log(timestamp);
            return (newMessage);
        }
    }
}
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

const ChatMessages = ({user, currentChatID, setUpdate}) => {
    // const [messages, setMessages] = useState(user.chats.messages);
    
    // console.log("hello");
    // const fetchData = async () => {
    //     const result = await getChatMessages(currentChatID,user.token,user);
    //     console.log(result);
    //     setMessages(result);
    // }
    
    // fetchData()

    // console.log(messages);
    console.log(user.chats[currentChatID]);
    console.log(user.chats[currentChatID].messages);
    console.log(user.chats[currentChatID].messages[2]);
    return (
        <ol className="messages-list">
    {user.chats[currentChatID].messages &&
      user.chats[currentChatID].messages.map((message) => {
        console.log('Message:', message); // Add this console log
        return (
          <li key={message.id}>
            <Message message={message} user={user} />
          </li>
        );
      })}
  </ol>
    );
}

// export default ChatMessages;
export {getChatMessages};
// import Message from "./Message";
// import "./ChatMessages.css"

// const getMessages = async (chatID, token, messageId) => {
//     console.log(chatID);
//     console.log(token);
//     const response = await fetch("http://localhost:5000/api/Chats/" + chatID + "/Messages", {
//         method: "GET",
//         headers: {
//             "Authorization": "Bearer " + token,
//             "Accept": "*/*"
//         }
//     });
//     const res = await response.json();
//     for (const message of res) {
//         console.log(message);
//         if(messageId===message.id){
//             return message;
//         }
//     }
// }
// const getChatMessages = async (chatID, token) => {
//     console.log(chatID);
//     console.log(token);
//     const response = await fetch("http://localhost:5000/api/Chats/" + chatID + "/Messages", {
//         method: "GET",
//         headers: {
//             "Authorization": "Bearer " + token,
//             "Accept": "*/*"
//         }
//     });
//     const res = await response.json();
//     return res;
// }

// const ChatMessages = ({user, currentChatID}) => {
//     return (
//         <ol className="messages-list">
//             {getChatMessages(currentChatID,user.token).map(message => (
//                 <li key={message.id}>
//                     <Message message={getMessages(currentChatID,user.token,message.id)} user={user}/>
//                 </li>
//             ))}
//         </ol>
//     );
// }

// export default ChatMessages;