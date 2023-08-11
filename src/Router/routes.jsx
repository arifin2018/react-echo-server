import { Route, BrowserRouter as Router,Routes } from "react-router-dom";
import PrivateRoute from "./private-route";
import Home from "../Pages/home";
import Login from "../Pages/Auth/login";
import Register from "../Pages/Auth/register";
import Navbar from "../Components/navbar";
import Context from "../Pages/Context";
import Context2 from "../Pages/Context2";

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
                <Route
                path="/tesContext2" element={
                    <>
                        <Context2></Context2>
                    </>
                    }
                />
                <Route
                    exact path='/test-context' element={<PrivateRoute />}
                >
                    <Route exact path='/test-context' element={<Context />} />
                </Route>
            </Routes>
        </Router>
    )
}