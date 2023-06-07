import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./Login.css";
import "./SignInUp.css";


const getMessages = async (chatID, token) => {
    // console.log(chatID);
    // console.log(token);
    const response = await fetch("http://localhost:5000/api/Chats/" + chatID + "/Messages", {
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

const signIn = async (username, password, setToken) => {
    
    const response = await fetch("http://localhost:5000/api/Tokens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username, password: password
        })
    });
    if (!response.ok) {
        return 0;
    }
    const data = await response.text();
    console.log(data); // Log the response body to investigate the issue
    setToken(data);
    const data1 = await getContacts(data);
    console.log(data1);
    let chats = {};
    // For each chat, get messages
    for (const chat of data1) {
        // console.log(chat);
        const messages = await getMessages(chat.id, data);
        // Add messages to chat
        chats[chat.id] = {
            ...chat,
            messages: messages
        };
    }
    const name = await getUserDetails(data, username);
    console.log(name);
    // Create user object
    const user = {
        username: username,
        name: name.displayName,
        chats: chats,
        profilePic: name.profilePic,
        token: data
    }

    return user;
}

const SignInForm = ({setUser, setToken}) => {
    const usernameBox = useRef(null);
    const passwordBox = useRef(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        // Validate username and password
        // If valid, sign in user and redirect to main page

        e.preventDefault();

        const username = usernameBox.current.value;
        const password = passwordBox.current.value;

        // Hide all error messages
        document.querySelectorAll('.form-control').forEach(element => {
            element.classList.remove("is-invalid");
        });
        document.querySelectorAll('.form-help').forEach(element => {
            element.classList.remove("text-danger");
        });

        signIn(username, password, setToken).then(user => {
            // If valid
            if (user) {
                setUser(user);
                navigate("/");
            } else {
                // Show error messages
                document.getElementById("floatingUsername").classList.add("is-invalid");
                document.getElementById("username-label").classList.add("text-danger");
                // Disable submit button
                document.getElementById("sign-in-button").disabled = true;
            }
        });
    };
    // Prevent user from entering invalid characters
    const enforceUsernameRegEx = (e) => {
        if (!/[a-zA-Z0-9-]$/.test(e.key)) {
            e.preventDefault();
        }
    }

    const handleChange = (e) => {
        // Check if username and password are empty
        document.getElementById("sign-in-button").disabled = usernameBox.current.value === "" || passwordBox.current.value === "";
    };

    // useEffect(() => {
    //     // If user is signed in, redirect to main page.
    //     if (currentUser) {
    //         navigate("/");
    //     }
    // }, [currentUser, navigate]);

    const [isVisible, setVisible] = useState(0)

    const toggleVisibility = () => {
        setVisible(1 - isVisible)
    }
    return (
        <main>
            <div id="form-frame">
                <img className='welcome' src='media/welcome.png' />
                <h1 className="form-title">Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-help" id="username-label">Username</label>
                        <input type="text" className="form-control" id="floatingUsername" ref={usernameBox}
                            onChange={handleChange} onKeyPress={enforceUsernameRegEx} maxLength="30"/>
                        <label className="invalid-feedback">One of the fields is invalid</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-help" id="password-label">Password</label>
                        <input type={isVisible ? "text" : "password"} ref={passwordBox} className="form-control"
                            maxLength="30" onChange={handleChange}/>
                        <button className="show-password-button" type="button" onClick={toggleVisibility}>
                            <span className={isVisible ? "bi-eye-slash" : "bi-eye"}/>
                        </button>
                    </div>
                    <button type="submit" className="submit-button" id="sign-in-button" disabled>SIGN IN</button>
                </form>
                <p className="form-question">Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </main>
    )
};

export default SignInForm;
export {signIn, getMessages, getContacts};