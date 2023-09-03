import { RecoilRoot, useRecoilState } from 'recoil';
import './App.css';
import Routes from './Router/routes.jsx'
import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { getCookie } from './Helpers/Cookie';
import { MessagesRecoil, UserChatRecoil } from './Helpers/Recoil';

function App() {
  const [messages, setMessages] = useRecoilState(MessagesRecoil);
  const [userChat, setUserChat] = useRecoilState(UserChatRecoil);

  console.log(userChat);
  useEffect(()=>{
    // Pusher.logToConsole = true;
    var channel = new Pusher('72c7cc74868f610f8163', {
        cluster: 'mt1',
        forceTLS: true,
        encrypted: true,
        authEndpoint:"https://backend.arifinportfolio.my.id/api/broadcasting/auth",
        auth: {
            headers: {
                Authorization: `Bearer ${getCookie('access_token')}`,
                Accept: 'application/json',
            },
        },
    }).subscribe(`private-messageChat-${userChat.id}`);
    channel.bind('private.sendMessage', (data,error) => {
        setMessages((old) => [...old,data.dataMessage]);
    });
},[userChat])

  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
