import { Navigate, Route, BrowserRouter as Router,Routes } from "react-router-dom";
import PrivateRoute from "./private-route";
import Home from "../Pages/home";
import Login from "../Pages/Auth/login";
import Register from "../Pages/Auth/register";
import Navbar from "../Components/navbar";
import { getCookie } from "../Helpers/Cookie";
import Chat from "../Pages/Chat";
import ChatRoom from "../Pages/ChatRoom";

export default function routes() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={
                <>
                    <Navbar>
                        <Home/>
                    </Navbar>
                </>
                }/>
                <Route path="/login" element={
                <>
                    <Navbar>
                    {
                        getCookie('access_token') === '' 
                        ? 
                        <Login></Login>
                        :
                        <Navigate to='/context' replace={true}/>
                    }
                    </Navbar>
                </>
                }/>
                <Route path="/register" element={
                <>
                    <Navbar>
                        {
                            getCookie('access_token') === '' 
                            ? 
                            <Register></Register>
                            :
                            <Navigate to='/context' replace={true}/>
                        }
                    </Navbar>
                </>
                }/>
                <Route
                    path='/' element={<PrivateRoute />}
                >
                    <Route path='/context' element={<Chat/>} >
                        <Route path=':id' element={<ChatRoom/>} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}