import ChatMessages from "./ChatMessages";
import './ChatSection.css';
import {useEffect, useRef, useState} from "react";
import Message from "./Message";

const ChatSection = ({user, setUser, currentChatID, setUpdate}) => {
    const messageBox = useRef(null);
    const [messageEmpty, setMessageEmpty] = useState(true);
    const messagesLength = currentChatID !== -1 ? user.chats[currentChatID].messages.length : 0;
    const getContacts = async (token) => {
        const response = await fetch("http://localhost:5000/api/Chats", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "*/*"
            }
        });
        return await response.json();
    }
    const getUserDetails = async (token,username) => {
        const response = await fetch("http://localhost:5000/api/Users/" + username, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "*/*"
            }
        });
        return await response.json();
    }
    const getMessages = async (chatID, token) => {
        const response = await fetch("http://localhost:5000/api/Chats/" + chatID + "/Messages", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "*/*"
            }
        });
        return await response.json();
    }
    const signInAgain = async (username,token) => {
        const data1 = await getContacts(token);
        let chats = {};
        for (const chat of data1) {
            const messages = await getMessages(chat.id, token);
            chats[chat.id] = {
                ...chat,
                messages: messages
            };
        }
        const name = await getUserDetails(token, username);
        const user = {
            username: username,
            name: name.displayName,
            chats: chats,
            profilePic: name.profilePic,
            token: token
        }
        const array = user.chats[currentChatID].messages
        console.log(array);

        const reversedArray = array.reverse();
        console.log(reversedArray);

        return user;
    }
    const sendMessage = async (message) => {
        const response = await fetch("http://localhost:5000/api/Chats/" + currentChatID + "/Messages", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + user.token,
                "Accept": "*/*",
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                msg: message
            })
        });
        if (!response.ok) {
            return 0;
        }
        const data = await response.text();
        console.log(data);
    };

    const sendTextMessage = () => {
        const message = messageBox.current.value.trim();
        console.log(message);
        sendMessage(message);
        clearMessageBox();
        signInAgain(user.username, user.token).then(user => {
            if (user) {
                setUser(user);
            }
        });
        setUpdate(message);
    };

    const typing = () => {
        setMessageEmpty(messageBox.current.value.length === 0);
    };
    const clearMessageBox = () => {
        if (messageBox.current) {
          messageBox.current.value = "";
        }
      };
    const setInputHeight = () => {
        let messageInput = document.getElementById("message-input");
        let inputSection = document.getElementById("input-section");
        if (!messageInput || !inputSection) {
            return;
        }
        let optimalHeight;
        do {
            optimalHeight = messageInput.scrollHeight;
            inputSection.style.height = Math.max(messageInput.scrollHeight + 10, 50) + "px";
        } while (messageInput.scrollHeight !== optimalHeight);
    };

    const keyPressed = (e) => {
        setInputHeight();
        if (messageBox.current.value === "" && (/\s/.test(e.key) || e.key === "Enter")) {
            e.preventDefault();
        } else if (e.key === "Enter" && !e.shiftKey) {
            sendTextMessage();
            
            e.preventDefault();
        }
    }

    const scrollToBottom = () => {
        const messageBubbles = document.getElementsByClassName('message-bubble');
        if (messageBubbles.length > 0) {
            messageBubbles[messageBubbles.length - 1].scrollIntoView();
        }
    };

    useEffect(scrollToBottom, [messagesLength]);

    return (
        <>
            <button className='logout-button btn btn-danger' id="logout-button" onClick={() => setUser(null)}>Logout</button>
            {(currentChatID !== -1 && <>
                    <div className="chat-section-header">
                            <span className="user-header">
                                <span className="profile-pic">
                                    <img
                                        src={user.chats[currentChatID].user.profilePic}
                                        className="center" alt="profile-pic"/>
                                </span>
                                <span className="user-header-title">
                                    <div className="center">
                                        {user.chats[currentChatID].user.displayName}
                                    </div>
                                </span>
                            </span>
                    </div>
                    <div className="chat-section-messages">
                                      
        <ol className="messages-list">
    {user.chats[currentChatID].messages.reverse() &&
      user.chats[currentChatID].messages.reverse().map((message) => {
        return (
          <li key={message.id}>
            <Message message={message} user={user} />
          </li>
        );
                            })}
                        </ol>

                    </div>
                    <div id="input-section">
                <span className="chat-input">
                    {(<textarea ref={messageBox} id="message-input" placeholder="Type a message..."
                                      onChange={typing}
                                      onKeyDown={keyPressed}/>
                        )
                    }

                </span>
                        <span className="buttons">
                                {((!messageEmpty) &&
                                        <button className="center icon-button" onClick={sendTextMessage}>
                                            <i className="bi bi-send"/>
                                        </button>
                                    ) 
                                }
                            </span>
                    </div>
                </>
            ) || <div className="max">
                <div className="welcome center">
                    Select a contact to start messaging...
                </div>
            </div>
            }
        </>
    );
}

export default ChatSection;