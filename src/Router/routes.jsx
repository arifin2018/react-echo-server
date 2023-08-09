import { Route, BrowserRouter as Router,Routes } from "react-router-dom";
import Home from "../Pages/home";
import Login from "../Pages/Auth/login";
import Register from "../Pages/Auth/register";
import Navbar from "../Components/navbar";
import Chat from "../Pages/Chat";

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
                        <Login></Login>
                    </Navbar>
                </>
                }/>
                <Route path="/register" element={
                <>
                    <Navbar>
                        <Register></Register>
                    </Navbar>
                </>
                }/>
                <Route path="/chat" element={
                <>
                    <Chat></Chat>
                </>
                }/>
            </Routes>
        </Router>
    )
}