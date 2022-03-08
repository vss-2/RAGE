import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Chat from './Chat/Chat';
import Feed from './Feed/Feed';
import Login from './Login/Login';
import Recover from './Recover/Recover';

const PageRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login"   element={ <Login /> } />
                <Route path="/feed"    element={ <Feed /> } />
                <Route path="/chat"    element={ <Chat /> } />
                <Route path="/recover" element={ <Recover /> } />
                <Route path="/" exact  element={ <Homepage /> } />
            </Routes>
        </>
    )
}

export default PageRoutes;
