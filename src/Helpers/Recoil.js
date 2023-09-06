import { atom } from "recoil";

const MessagesRecoil = atom({
    key: 'MessagesRecoil',
    default:[]
})

const UserChatRecoil = atom({
    key: 'UserChatRecoil',
    default:[]
})

const UserDataExist = atom({
    key: 'UserDataExist',
    default: [],
})

export {MessagesRecoil, UserChatRecoil, UserDataExist};