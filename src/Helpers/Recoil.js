import { atom } from "recoil";

const MessagesRecoil = atom({
    key: 'MessagesRecoil',
    default:[]
})

const UserChatRecoil = atom({
    key: 'UserChatRecoil',
    default:[]
})

export {MessagesRecoil, UserChatRecoil};