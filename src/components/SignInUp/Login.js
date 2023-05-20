import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./Login.css";
import "./SignInUp.css";


const SignInForm = ({DB, currentUser, setCurrentUser}) => {
    const usernameBox = useRef(null);
    const passwordBox = useRef(null);
    const navigate = useNavigate();

    const handleSignIn = (e) => {
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

        // Check if username and password are valid
        const user = Object.values(DB.users).find((user) => user.username === username && user.password === password);
        // If a valid user was found
        if (user) {
            // Sign in user
            const chats = Object.fromEntries(Object.entries(DB.chats)
                .filter(([chatID, chat]) => chat.members.includes(username))
                .map(([chatID, chat]) => [chatID, Object.assign(chat, {"unreadMessages": user.chats[chatID].unreadMessages})]));
            setCurrentUser({
                "username": username,
                "name": user.name,
                "profilePicture": user.profilePicture,
                "chats": chats
            });
        } else {
            document.getElementById("floatingUsername").classList.add("is-invalid");
            document.getElementById("username-label").classList.add("text-danger");
            // Disable submit button
            document.getElementById("sign-in-button").disabled = true;
        }
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

    useEffect(() => {
        // If user is signed in, redirect to main page.
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

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