import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import API from "../Api";
import { DeleteAll, getCookie } from "../Helpers/Cookie";
import { useRecoilState } from "recoil";
import { MessagesRecoil, UserChatRecoil } from "../Helpers/Recoil";
import DataAndLogout from "../Components/Users/dataAndLogout";

export default function ChatRoom(params) {
    const [messages, setMessages] = useRecoilState(MessagesRecoil);
    const [userChat, setUserChat] = useRecoilState(UserChatRecoil);
    const [buttonNavbar, setButtonNavbar] = useState(false);
    const {register, handleSubmit, reset} = useForm({});
    const messageEnd = useRef(null);
    const {id} = useParams();

    async function sendChat(data) {
        await API({
            path: `/chat/${id}`,
            method: 'POST',
            data,
            token: getCookie('access_token')
        }).catch(function (e) {
            if (e.response?.status !== 200) {
                DeleteAll()
                window.location.reload()
            }
        })
        reset()
        let datas = {
            'sender_id':JSON.parse(getCookie('user')).id,
            'receiver_id':id,
            'message':data.message
        }
        setMessages((old) => [...old,datas]);
    }

    async function getChat(data) {
        let response = await API({
            path: `/chat/${id}`,
            method: 'GET',
            token: getCookie('access_token')
        }).catch(function (e) {
            if (e.response?.status !== 200) {
                DeleteAll()
                window.location.reload()
            }
        })
        setMessages(response.message);
        setUserChat(response.user);
    }

    useEffect(()=>{
        getChat()
        // eslint-disable-next-line
    },[id])

    function scrollToBottom() {
        messageEnd.current?.scrollTo({
            behavior: "smooth",
            top: document.body.scrollHeight * 9999,
        })
    }

    useEffect(()=>{
        scrollToBottom()
    },[messages])
    return <>
        <div>
            <div className="flex justify-between relative border-b-4">
                <h1 className="p-3 min-h-[7%] font-medium">{userChat.name}</h1>
                <button className="block md:hidden relative" type="button" onClick={e => setButtonNavbar(!buttonNavbar)}>
                    {
                        buttonNavbar ? 
                            <box-icon type='solid' name='chevron-up'></box-icon>
                        :
                        <>
                            <box-icon type='solid' name='chevron-down'></box-icon>
                        </>
                    }
                </button>
            </div>
            {
                buttonNavbar ?
                    <div className="absolute bg-slate-200 w-full">
                        <DataAndLogout position="start"></DataAndLogout>
                    </div>
                :
                    <div className="hidden"></div>
            }
        </div>
        <div className="px-3 py-3 h-[86%] overflow-y-auto space-y-4" ref={messageEnd}>
            {
                messages.length > 0 ?
                    messages?.map((message, i) => {
                        return message?.sender_id === JSON.parse(getCookie('user')).id ?
                            <span className="flex justify-end" key={i}>
                                <p className=" bg-slate-400 px-2 py-1 rounded max-w-[90%]">
                                    {message?.message}
                                </p>
                            </span>
                        :
                            <span className="flex justify-start" key={i}>
                                <p className=" bg-gray-200 px-2 py-1 rounded max-w-[90%]">
                                    {message?.message}
                                </p>
                            </span>
                    }) 
                :
                <h1 className="flex justify-center items-center h-full">Doesn't have chat anything, let's chat with {userChat.name}</h1>
            }
        </div>
        <form onSubmit={handleSubmit(sendChat)} method="post" className="h-[6%]">
            <input type="text" {...register("message", { required: "Please enter your chat." })} className="bottom-0 h-[7%] py-6 px-3 w-full border-t-gray-300 border-t-2 outline-0 focus:border-t-2 focus:border-l-2 focus:border-gray-800 focus:h-full" placeholder="Write message..."/>
        </form>
    </>
};