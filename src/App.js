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

function App() {
  const [messages, setMessages] = useRecoilState(MessagesRecoil);
  const [userChat, setUserChat] = useRecoilState(UserChatRecoil);

  useEffect(()=>{
    
    // Pusher.logToConsole = true;
    var channel = new Pusher('72c7cc74868f610f8163', {
        cluster: 'mt1',
        forceTLS: true,
        encrypted: true,
        authEndpoint:`${API_URL}/broadcasting/auth`,
        auth: {
            headers: {
                Authorization: `Bearer ${getCookie('access_token')}`,
                Accept: 'application/json',
            },
        },
    }).subscribe(`private-messageChat-${userChat.id}`);
    channel.bind('private.sendMessage', async (data,error) => {
      if (data.dataMessage.type == 'image') {
        console.log(data.dataMessage);
        const resultMessage = await Promise.resolve(getImageStorage(data.dataMessage.message))
        data.dataMessage = {
          ...data.dataMessage,
          message: resultMessage
        }
        setMessages((old) => [
          ...old,data.dataMessage
        ]);
      }else{
        setMessages((old) => [
          ...old,data.dataMessage
        ]);
      }
    });
},[userChat])

  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
