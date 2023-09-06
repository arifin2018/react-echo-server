import { useRecoilState } from "recoil";
import API from "../Api";
import { DeleteAll, getCookie } from "../Helpers/Cookie";
import { useEffect, useState} from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { UserDataExist } from "../Helpers/Recoil";
import DataAndLogout from "../Components/Users/dataAndLogout";

// import Pusher from 'pusher-js/with-encryption';

function Chat() {
    // const [users, setUsers] = useState([]);
    const [users, setUsers] = useRecoilState(UserDataExist)
    const [me, setMe] = useState([]);

    async function user() {
        await API({
            path: '/user',
            method: 'GET',
            token: getCookie('access_token')
        })
        .then((data)=>{
            setUsers(data.user)
        })
        .catch(function (e) {
            if (e.response?.status !== 200) {
                DeleteAll()
                window.location.reload()
            }
        })
    }

    useEffect(() => {
        setMe(JSON.parse(getCookie('user')))
        user()
    }, []);

    return (
        <div className="flex w-full h-screen">
            <div className="hidden md:block w-3/12 border-r-2 h-full py-16 text-right">
                <DataAndLogout/>
            </div>
            <div className="w-full md:w-9/12 h-full">
                <RightScreen/>
            </div>
        </div>
    )
}


function RightScreen(params) {
    const {id} = useParams();
    return (
        id ? 
            <Outlet/>
        :
            <h1 className="flex justify-center items-center h-full">Doesn't have chat anything, let's chat with everyone</h1>
    )    
}

export default Chat;
