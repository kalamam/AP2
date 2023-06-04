import {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from "./components/SignInUp/Register";
import ChatScreen from "./components/ChatPage/ChatScreen";
import Login from "./components/SignInUp/Login"

const App = () => {
    // const [currentUser, setCurrentUser] = useState(null);
    // const [DB, setDB] = useState(file);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);


    // return (
    //     <Router>
    //         <div className="App" data-theme='light'>
    //             <main>
    //                 <Routes>
    //                     <Route path='/' element={
    //                         currentUser ?
    //                             <ChatScreen user={currentUser} setUser={setCurrentUser} DB={DB} setDB={setDB}/> :
    //                             <Login DB={DB} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    //                     }/>
    //                     <Route path='/signin' element={
    //                         <>
    //                             <Login DB={DB} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    //                         </>
    //                     }/>
    //                     <Route path='/signup' element={
    //                         <>
    //                             <Register DB={DB} setDB={setDB} currentUser={currentUser}
    //                                         setCurrentUser={setCurrentUser}/>
    //                         </>
    //                     }/>
    //                 </Routes>
    //             </main>
    //         </div>
    //     </Router>
    // );
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route path='/' element={
                            // Check if user is signed in or not. If not, render landing page.
                            // If signed in, Render the Chat page.
                            user ?
                                <ChatScreen user={user} setUser={setUser} token={token}/> :
                                <Login user={user} setUser={setUser} token={token} setToken={setToken}/>

                        }/>
                        <Route path='/signin' element={
                            // Render the SignIn component.
                            <>
                                <Login user={user} setUser={setUser} token={token} setToken={setToken}/>
                            </>
                        }/>
                        <Route path='/signup' element={
                            // Render the Signup component.
                            <>
                                <Register user={user} setUser={setUser} token={token} setToken={setToken}/>
                            </>
                        }/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
