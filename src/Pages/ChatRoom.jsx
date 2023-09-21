import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import API from "../Api";
import { DeleteAll, getCookie } from "../Helpers/Cookie";
import { useRecoilState } from "recoil";
import { MessagesRecoil, UserChatRecoil, modalUploadRecoil } from "../Helpers/Recoil";
import CardUpload from "../Components/Cardupload";
import React  from 'react';


export default function ChatRoom(params) {
    const [messages, setMessages] = useRecoilState(MessagesRecoil);
    const [userChat, setUserChat] = useRecoilState(UserChatRecoil);
    const {register, handleSubmit,reset} = useForm({});
    const messageEnd = useRef(null);
    const {id} = useParams();
    const [modalUpload ,setModalUpload] = useRecoilState(modalUploadRecoil)
    const [fileContent, setFileContent] = useState('');
    const [file, setFile] = useState('');
    const [type, setType] = useState('');
    function handleFileUpload(e){
        const file = e.target.files[0];
        setFile(e.target.files[0])
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContentEvent = event.target.result;
                setFileContent(fileContentEvent)
            };
            reader.readAsDataURL(file);
        }
    }
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    async function sendChat(data) {
        if (type === "image") {
            data = new FormData();
            data.append("image", dataURLtoFile(fileContent,'File'));
        }
        await API({
            path: `/chat/${id}`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
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
            'message':data.message,
            'type':type
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

    function UpdateModalUpload() {
        setModalUpload(!modalUpload)
    }

    useEffect(()=>{
        getChat()
        // eslint-disable-next-line
    },[id])

    function scrollToBottom() {
        return messageEnd.current?.scrollTo({
            behavior: "smooth",
            top: document.body.scrollHeight * 9999,
        })
    }

    useEffect(()=>{
        scrollToBottom()
    },[messages])
    return <>
        <div className="px-3 py-3 h-[86%] overflow-y-auto space-y-4" ref={messageEnd}>
            {
                modalUpload &&
                <CardUpload register={register} useForm={useForm} setType={setType} sendChat={sendChat} handleFileUpload={handleFileUpload} fileContent={fileContent} setFileContent={setFileContent}/>
            }
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
        <form onSubmit={handleSubmit(sendChat)} method="post" className="h-[8%]">
            <div className="flex border-l-2 h-full">
                <div>
                    <div className="cursor-pointer mx-2 my-3" onClick={UpdateModalUpload}>
                        <box-icon name='upload'></box-icon>
                    </div>
                </div>
                <input type="text" {...register("message", { required: "Please enter your chat." })} className="bottom-0 py-5 px-2 w-full h-full border-t-gray-300 border-t-2 outline-0 focus:border-t-2 border-l-2 focus:border-l-2 focus:border-gray-800 focus:h-full relative" placeholder="Write message..."/>
                <button className="right-5 top-5" type="submit">
                    <box-icon type='solid' size='md' name='send'></box-icon>
                </button>
            </div>
        </form>
    </>
};
