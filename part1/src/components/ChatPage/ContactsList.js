import { useEffect } from 'react';
import './ContactsList.css'

const ContactsList = ({user, setUser, DB, setDB, currentChatID, setCurrentChatID}) => {
    
    console.log()
    const selectChat = (chatID) => {
        setCurrentChatID(chatID);
        // Mark as read
        setUser({
            ...user, chats: Object.fromEntries(Object.entries(user.chats).map(([id, chat]) => {
                if (id === chatID) {
                    return [id, {...chat, "unreadMessages": 0}];
                }
                return [id, chat];
            }))
        });
    }
    // console.log(user.chats);
    // Copy the contacts array and sort it by time of last message
    const sortedChats = Object.entries(user.chats).slice().sort(([c1ID, c1], [c2ID, c2]) => {
        const a = c1.messages.length > 0 ? c1.messages.at(0).timestamp : 0;
        const b = c2.messages.length > 0 ? c2.messages.at(0).timestamp : 0;
        return Date.parse(b).valueOf() - Date.parse(a).valueOf();
    });

    const lastMessageDict = {
        "image": <><i className="bi bi-image"/> Image </>,
        "video": <><i className="bi bi-film"/> Video </>,
    };


    return (
        <ol className="contacts-list">
            {sortedChats.map(([chatID, chat]) => (
                <ul key={chatID}
                    className={(currentChatID !== -1 && currentChatID === chatID) ? "contact active" : "contact"}
                    onClick={() => {
                        selectChat(chatID)
                    }}>
                    <span className="contact-meta-data">
                        {chat.unreadMessages > 0 &&
                            <div className="unread">
                                <span className="unread-count">{chat.unreadMessages}</span>
                            </div>
                        }
                        <div className="last-message-time">
                            <h6>
                                {(chat.messages.length) ? new Date(chat.messages.at(-1).created).toLocaleTimeString('en-US', {
                                    hourCycle: 'h23',
                                    hour: "numeric",
                                    minute: "numeric"
                                }) : ''}
                            </h6>
                        </div>
                    </span>
                    <span className="user-header">
                        <span className="profile-pic">
                            <img
                                src={user.chats[chatID].user.profilePic}
                                className="center" alt="profile-pic"/>
                        </span>
                        <span className="contact-info">
                            <div className="center">
                                <h6 className="contact-name">
                                    {user.chats[chatID].user.displayName}
                                </h6>
                                <h6 className="last-message-sent">
                                    {/* If last message sent is a text message, display its content. Else, display the right description */}
                                    {user.chats[chatID].lastMessage && user.chats[chatID].lastMessage.id && user.chats[chatID].lastMessage.content && user.chats[chatID].lastMessage.created && (
                                        <p>{user.chats[chatID].lastMessage.content}</p>
                                    )}
                                </h6>
                            </div>
                        </span>
                    </span>
                </ul>
            ))}
        </ol>
    );
}

export default ContactsList;