import { useEffect, useRef, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import API from "../Api";
import { DeleteAll, getCookie } from "../Helpers/Cookie";
import { useRecoilState } from "recoil";
import { MessagesRecoil, UserChatRecoil, errorCardUpload, modalUploadRecoil } from "../Helpers/Recoil";
import CardUpload from "../Components/Cardupload";
import React  from 'react';
import { Buffer } from "buffer";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { generateRandomString } from "../Constant/string";
import { getImageStorage } from "../Constant/firebase";

export default function ChatRoom(params) {
    const [messages, setMessages] = useRecoilState(MessagesRecoil);
    const [userChat, setUserChat] = useRecoilState(UserChatRecoil);
    const {register, handleSubmit,reset} = useForm({});
    const messageEnd = useRef(null);
    const {id} = useParams();
    const [modalUpload ,setModalUpload] = useRecoilState(modalUploadRecoil)
    const [fileContent, setFileContent] = useState('');
    const [file, setFile] = useState('');
    const [error, setError] = useRecoilState(errorCardUpload);
    const [type, setType] = useState('text');

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

    async function sendChat(data) {
        setError('')
        if (type === "image") {
            if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                setError('please select image valid. jpg|jpeg|png|gif')
                return false
            }
            let resultURLImage = '';
            const storage = getStorage();
            UpdateModalUpload()
            let name = file.name.replace(/\s+/g, '');
            const storageRef = ref(storage, `/Chat/${generateRandomString(4)}^${name}`);
            await uploadString(storageRef, fileContent, 'data_url').then((snapshot) => {
                resultURLImage = snapshot.metadata.fullPath;
            });
            data = {
                message:resultURLImage,
                type: type
            }
            setType('image')
        }
        data = {
            ...data,
            type: type
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
        if (type === "image") {
            data = {
                ...data,
                message: fileContent
            }
        }
        
        let datas = {
            'sender_id':JSON.parse(getCookie('user')).id,
            'receiver_id':id,
            'message':data.message,
            'type':type
        }
        setMessages((old) => [...old,datas]);
        setFileContent('')
        setFile('')
        setType('text')
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
        const onlyImage = response.message.filter(item => item.type === 'image');
        const result = await Promise.allSettled(onlyImage.map(item => getImageStorage(item.message)))
        let count = 0;

        const imageMessage = result.map(item => item.value)
        const newMessage = response.message.map(item => {
            if (item.type === 'image') {
                const result = {
                    ...item,
                    message: imageMessage[count]
                }
                count++
                return result
            }
            return item
        })

        setMessages(newMessage);
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
        return setTimeout(messageEnd.current?.scrollTo({
            behavior: "smooth",
            top: document.body.scrollHeight * 9999,
        }),1500)
        
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
                                    {
                                        message.type === 'text' ? 
                                        message?.message :
                                        <img className="max-h-60" src={message?.message} onLoad={scrollToBottom} alt={message?.message} />
                                    }
                                </p>
                        </span>
                        :
                        <span className="flex justify-start" key={i}>
                            <p className=" bg-gray-200 px-2 py-1 rounded max-w-[90%]">
                                {
                                    message.type === 'text' ? message?.message : 
                                    <img className="max-h-60" src={message?.message} onLoad={scrollToBottom} alt={message?.message} />
                                }
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
