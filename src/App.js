import { RecoilRoot, useRecoilState } from 'recoil';
import './App.css';
import Routes from './Router/routes.jsx'
import { useEffect } from 'react';
import React  from 'react';
import Pusher from 'pusher-js';
import { getCookie } from './Helpers/Cookie';
import { MessagesRecoil, UserChatRecoil } from './Helpers/Recoil';
import API_URL from './Constant/api-url';
import { getImageStorage } from './Constant/firebase';
import Echo from 'laravel-echo'

function App() {
  const [messages, setMessages] = useRecoilState(MessagesRecoil);
  const [userChat, setUserChat] = useRecoilState(UserChatRecoil);

  useEffect(()=>{
    window.io = require('socket.io-client');
    window.Echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://backend.arifinportfolio.my.id',
      authEndpoint:`${API_URL}/broadcasting/auth`,
      key: "682cb8acab2f22e12728f0f349648bc6",
      withCredentials: true,
      auth: {
        headers: {
            Authorization: `Bearer ${getCookie('access_token')}`
        },
      },
    });
    window.Echo.private(`messageChat-${userChat.id}`).listen('.private.sendMessage',async (data,error) => {
      if (data.dataMessage.type == 'image') {
        console.log(data.dataMessage);
        const resultMessage = await Promise.resolve(getImageStorage(data.dataMessage.message))
        data.dataMessage = {
          ...data.dataMessage,
          message: resultMessage,
          created_at:new Date().toISOString(),
        }
        setMessages((old) => [
          ...old,data.dataMessage
        ]);
      }else{
        data.dataMessage = {
          ...data.dataMessage,
          created_at:new Date().toISOString(),
        }
        setMessages((old) => [
          ...old,data.dataMessage
        ]);
      }
    })

    // Pusher.logToConsole = true;
    // var channel = new Pusher('72c7cc74868f610f8163', {
    //     cluster: 'mt1',
    //     forceTLS: true,
    //     encrypted: true,
    //     authEndpoint:`${API_URL}/broadcasting/auth`,
    //     auth: {
    //         headers: {
    //             Authorization: `Bearer ${getCookie('access_token')}`,
    //             Accept: 'application/json',
    //         },
    //     },
    // }).subscribe(`private-messageChat-${userChat.id}`);
    // channel.bind('private.sendMessage', async (data,error) => {
    //   if (data.dataMessage.type == 'image') {
    //     console.log(data.dataMessage);
    //     const resultMessage = await Promise.resolve(getImageStorage(data.dataMessage.message))
    //     data.dataMessage = {
    //       ...data.dataMessage,
    //       message: resultMessage,
    //       created_at:new Date().toISOString(),
    //     }
    //     setMessages((old) => [
    //       ...old,data.dataMessage
    //     ]);
    //   }else{
    //     setMessages((old) => [
    //       ...old,data.dataMessage
    //     ]);
    //   }
    // });

  },[userChat])


  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
