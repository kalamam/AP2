import {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from "./components/SignInUp/Register";
import ChatScreen from "./components/ChatPage/ChatScreen";
import Login from "./components/SignInUp/Login"

const file = require('./database.json');

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [DB, setDB] = useState(file);

    return (
        <Router>
            <div className="App" data-theme='light'>
                <main>
                    <Routes>
                        <Route path='/' element={
                            currentUser ?
                                <ChatScreen user={currentUser} setUser={setCurrentUser} DB={DB} setDB={setDB}/> :
                                <Login DB={DB} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                        }/>
                        <Route path='/signin' element={
                            <>
                                <Login DB={DB} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                            </>
                        }/>
                        <Route path='/signup' element={
                            <>
                                <Register DB={DB} setDB={setDB} currentUser={currentUser}
                                            setCurrentUser={setCurrentUser}/>
                            </>
                        }/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
