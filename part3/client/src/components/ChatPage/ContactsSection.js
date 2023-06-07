import './ContactsSection.css'
import ContactsList from "./ContactsList";
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import SignInForm, {getContacts} from "../SignInUp/Login.js";
import io from "socket.io-client";

const ContactsSection = ({
                             user,
                             setUser,
                             DB,
                             setDB,
                             currentChatID,
                             setCurrentChatID,
                             setUpdate,
                         }) => {
    const navigate = useNavigate();
    const contactInput = useRef(null);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [showName, setShowName] = useState(user.displayName);
    const [addNewContact, setAddNewContact] = useState(true); 
    const [buttonClickCount, setButtonClickCount] = useState(0);
    const [displayedContacts, setDisplayedContacts] = useState(null);
    const socket = io.connect("http://localhost:5000")
    useEffect(() => {
        const initContacts = async () => {
            const contacts = await getContacts(user.token);
            setDisplayedContacts(contacts);
        };
        initContacts();
    });
    useEffect(() => {
        const fetchData = async () => {
            const name = await getUserDetails(user.token, user.username);
            console.log(name);
            setProfilePicture(name.profilePic);
            setShowName(name.displayName);
        }
        
        fetchData()
        const contactModal = document.getElementById("addContactModal");
        contactModal.addEventListener("hidden.bs.modal", () => {
            contactInput.current.value = "";
            document.getElementById("add-contact-input").classList.remove("is-invalid");
        });
    }, []);

    
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
    const getMessages = async (chatID, token) => {
        console.log(chatID);
        console.log(token);
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
        console.log(data1);
        let chats = {};
        // For each chat, get messages
        for (const chat of data1) {
            console.log(chat);
            const messages = await getMessages(chat.id, token);
            // Add messages to chat
            chats[chat.id] = {
                ...chat,
                messages: messages
            };
        }
        const name = await getUserDetails(token, username);
        console.log(name);
        // Create user object
        const user = {
            username: username,
            name: name.displayName,
            chats: chats,
            profilePic: name.profilePic,
            token: token
        }
    
        return user;
    }
  const addContact = async (e) => {
        e.preventDefault()
        document.getElementById("add-contact-input").classList.remove("is-invalid");
        let hasError = false;
        const requestedContact = contactInput.current.value.trim();
        if (requestedContact === "") {
            document.getElementById("add-contact-error").innerHTML = "Contact name cannot be empty";
            hasError = true;
        } else if (requestedContact === user.username) {
            document.getElementById("add-contact-error").innerHTML = "You can't add yourself";
            hasError = true;
        } else if (Object.values(user.chats).find(chat => chat.type === "one-to-one" && chat.members.includes(requestedContact))) {
            document.getElementById("add-contact-error").innerHTML = "This contact is already in your list";
            hasError = true;
        }

        if (hasError) {
            document.getElementById("add-contact-input").classList.add("is-invalid");
            return;
        }
        const response = await fetch("http://localhost:5000/api/Chats", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + user.token,
                "Accept": "*/*",
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: requestedContact
            })
        });
        if (!response.ok) {
            return 0;
        }
        const data = await response.text();
        console.log(data); // Log the response body to investigate the issue
        if (data) {
            contactInput.current.value = "";
            document.getElementById("close-modal-button").click();
        } else {
            document.getElementById("add-contact-input").classList.add("is-invalid");
            document.getElementById("add-contact-error").innerHTML = "User not found";
        }
        setButtonClickCount(buttonClickCount => buttonClickCount + 1);
        signInAgain(user.username, user.token).then(user => {
            // If valid
            if (user) {
                setUser(user);
                // navigate("/");
            }
        });
        // setUpdate(requestedContact);
        // navigate("/login");
        setDisplayedContacts(getContacts(user.token));

    };
    const handleKeyPress = (e) => {
        document.getElementById("add-contact-input").classList.remove("is-invalid");
        // If user presses enter, add contact
        if (e.key === "Enter") {
            addContact(e);
            return;
        }
        //Prevent user from entering invalid characters
        if (!/[a-zA-Z0-9-]$/.test(e.key)) {
            document.getElementById("add-contact-error").innerHTML = "Username must contain only letters, numbers, and hyphens";
            document.getElementById("add-contact-input").classList.add("is-invalid");
            e.preventDefault();
        }
    }
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
        const a = c1.messages.length > 0 ? c1.messages.at(-1).created : 0;
        const b = c2.messages.length > 0 ? c2.messages.at(-1).created : 0;
        return Date.parse(b).valueOf() - Date.parse(a).valueOf();
    });
    // Clear error message on change
    const clearUsernameError = () => {
        document.getElementById("add-contact-input").classList.remove("is-invalid");
        document.getElementById("add-contact-error").innerHTML = "";
    }

    
        
        return (
            <>
                <div className="contacts-section-header">
                    <span className="user-header">
                        <span className="profile-pic">
                            <img
                                src={profilePicture}
                                className="center" alt="profile-pic"/>
                        </span>
                        <span className="user-header-title">
                            <div className="center" id="self">
                                {showName}
                            </div>
                        </span>
                    </span>
                    <span className="buttons">
                        <button className="icon-button center" data-bs-toggle="modal" data-bs-target="#addContactModal">
                            <i className="bi bi-person-plus"/>
                        </button>
                    </span>
                </div>
    
                <div className="contacts">
                    {/* <ContactsList user={user}
                                  setUser={setUser}
                                  DB={DB}
                                  setDB={setDB}
                                  currentChatID={currentChatID}
                                  setCurrentChatID={setCurrentChatID}/> */}
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
                                {(chat.messages.length) ? new Date(chat.messages.at(user.chats[chatID].messages.length-1).created).toLocaleTimeString('en-US', {
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
                                    {user.chats[chatID].messages.at(user.chats[chatID].messages.length-1) && user.chats[chatID].messages.at(user.chats[chatID].messages.length-1).id && user.chats[chatID].messages.at(user.chats[chatID].messages.length-1).content && user.chats[chatID].messages.at(user.chats[chatID].messages.length-1).created && (
                                        <p>{user.chats[chatID].messages.at(user.chats[chatID].messages.length-1).content}</p>
                                    )}
                                </h6>
                            </div>
                        </span>
                    </span>
                </ul>
            ))}
        </ol>
                </div>
    
                <div className="modal fade" id="addContactModal">
                    <div className="modal-dialog">
                        <div className="modal-content add-contact-popup">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Contact</h4>
                                <button type="button" className="close-button" data-bs-dismiss="modal"
                                        id="close-modal-button">
                                    <i className="bi bi-x"/>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="text" ref={contactInput} className="add-contact-input form-control"
                                           id="add-contact-input" onKeyPress={handleKeyPress}
                                           onChange={clearUsernameError}/>
                                    <label className="invalid-feedback" id="add-contact-error"/>
                                </div>
                            </div>
    
                            <div className="modal-footer">
                                <button type="button" className="icon-button" onClick={addContact}>
                                    <i className="bi bi-plus-circle"/>
                                </button>
                            </div>
    
                        </div>
                    </div>
                </div>
            </>
        );
    
}

export default ContactsSection;