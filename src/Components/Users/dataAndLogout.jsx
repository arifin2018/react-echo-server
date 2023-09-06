import { NavLink } from "react-router-dom"
import { UserDataExist } from "../../Helpers/Recoil"
import { useRecoilState } from "recoil"
import { useEffect, useState } from "react";
import { getCookie } from "../../Helpers/Cookie";

const DataAndLogout = function(params) {
    const [users, setUsers] = useRecoilState(UserDataExist)
    const [me, setMe] = useState([]);

    useEffect(() => {
        setMe(JSON.parse(getCookie('user')))
    }, []);

    return(
            <>
                <div className="h-80 md:h-5/6 flex flex-col px-3 overflow-y-auto border-b-slate-300 border-b-2 space-y-2">
                    {
                        users?.map((user,i)=>{
                            return <h1 className="cursor-pointer" key={i}>
                                <NavLink to={'/context/'+user.id}>{user.name}</NavLink>
                            </h1>
                        })
                    }
                </div>
                <div className={`justify-start md:justify-end w-full flex`}>
                    <div className="w-full md:w-3/4 bg-slate-300 p-4 rounded-lg flex flex-col space-y-3">
                        <span>{me.name ?? ''}</span>
                        <div className={`flex justify-end`}>
                            <form action="" method="post" className="w-full">
                                <button type="submit" className="border bg-white rounded-md w-2/5">Logout</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default DataAndLogout