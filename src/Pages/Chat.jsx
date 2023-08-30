import API from "../Api";
import { DeleteAll, getCookie } from "../Helpers/Cookie";
import { useEffect, useState} from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
// import Pusher from 'pusher-js/with-encryption';

function Chat() {
    const [users, setUsers] = useState([]);

    async function user() {
        await API({
            path: '/user',
            method: 'GET',
            token: getCookie('access_token')
        })
        .then((data)=>{
            console.log(data);
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
        user()
    }, []);

    return (
        <div className="flex w-full h-screen">
            <div className="border-r-2 w-3/12 h-full py-16 text-right">
                <div className="flex flex-col px-3 h-5/6 overflow-y-auto border-b-slate-300 border-b-2 space-y-2">
                    {
                        users?.map((user,i)=>{
                            return <h1 className="cursor-pointer" key={i}>
                                <NavLink to={'/context/'+user.id}>{user.name}</NavLink>
                            </h1>
                        })
                    }
                </div>
                <div className="w-full flex justify-end">
                    <div className="bg-slate-300 p-4 rounded-lg flex flex-col w-3/4 space-y-3">
                        <span>Arifin</span>
                        <div className="flex justify-end">
                            <button type="submit" className="border bg-white rounded-md w-1/3">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-9/12 h-full">
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
