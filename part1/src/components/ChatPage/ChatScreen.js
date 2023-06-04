import ContactsSection from "./ContactsSection"
import ChatSection from "./ChatSection";
import "./ChatScreen.css";
import {useState} from "react";

const ChatScreen = ({user, setUser, DB, setDB}) => {
    const [currentChatID, setCurrentChatID] = useState(-1);
    const [update,setUpdate] = useState("Type a message...");
    const [messagesCache, setMessagesCache] = useState(Object.assign({}, ...Object.keys(user.chats).map((id) => {
        return {
            [id]: ""
        }
    })));

    return (
        
        <div id="content-frame">
            <div className="chat-section">
                <ChatSection user={user}
                             setUser={setUser}
                             currentChatID={currentChatID}
                             setUpdate ={setUpdate}
                />
            </div>
            <div className="contacts-section">
                <ContactsSection user={user}
                                 setUser={setUser}
                                 DB={DB}
                                 setDB={setDB}
                                 currentChatID={currentChatID}
                                 setCurrentChatID={setCurrentChatID}
                                 setUpdate ={setUpdate}
                />
            </div>
        </div>
    );
};

export default ChatScreen;