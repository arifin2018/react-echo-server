import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import API from "../Api";
import { getCookie } from "../Helpers/Cookie";
import Pusher from 'pusher-js';

export default function ChatRoom(params) {

    const [messages, setMessages] = useState([]);
    const {register, handleSubmit} = useForm({});
    const messageEnd = useRef(null);

    async function sendChat(data) {
        await API({
            path: '/chat/1',
            method: 'POST',
            data,
            token: getCookie('access_token')
        }).catch(function (e) {
            if (e.response?.status !== 200) {
                const cookies = document.cookie.split(";");
                cookies.forEach(cookie => {
                    const eqPos = cookie.indexOf("=");
                    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    window.location.reload()
                });
            }
        })
    }

    useEffect(()=>{
        // Pusher.logToConsole = true;
        var channel = new Pusher('72c7cc74868f610f8163', {
            cluster: 'mt1',
            forceTLS: true
        }).subscribe('messageChat');
        channel.bind('server.sendMessage', data => {
            setMessages((old) => [...old,data.dataMessage]);
        });
    },[])

    function scrollToBottom() {
        messageEnd.current?.scrollTo({
            behavior: "smooth",
            top: document.body.scrollHeight,
        })
    }

    useEffect(()=>{
        scrollToBottom()
    },[messages])

    return <>
            <h1 className="p-3 border-b-4 min-h-[7%] font-medium ">{JSON.parse(getCookie('user')).name}</h1>
            <div className="px-3 py-3 h-[86%] overflow-y-auto space-y-4" ref={messageEnd}>
                {
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
                }
            </div>
            <form onSubmit={handleSubmit(sendChat)} method="post" className="h-[6%]">
                <input type="text" {...register("message", { required: "Please enter your chat." })} className="bottom-0 h-[7%] py-6 px-3 w-full border-t-gray-300 border-t-2 outline-0 focus:border-t-2 focus:border-l-2 focus:border-gray-800 focus:h-full" placeholder="Write message..."/>
            </form>
    </>
};
