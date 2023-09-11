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
        
        <div className="px-3 py-3 h-[84%] overflow-y-auto space-y-4" ref={messageEnd}>
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
        <form onSubmit={handleSubmit(sendChat)} method="post">
            <div className="relative border-l-2">
                <input type="text" {...register("message", { required: "Please enter your chat." })} className="bottom-0 py-5 px-2 w-full border-t-gray-300 border-t-2 outline-0 focus:border-t-2 focus:border-l-2 focus:border-gray-800 focus:h-full relative" placeholder="Write message..."/>
                <button className="absolute right-5 top-5" type="submit">
                    <box-icon type='solid' size='md' name='send'></box-icon>
                </button>
            </div>
        </form>
    </>
};
