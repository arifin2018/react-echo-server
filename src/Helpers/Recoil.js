import { atom } from "recoil";

const MessagesRecoil = atom({
    key: 'MessagesRecoil',
    default:[]
})

const UserChatRecoil = atom({
    key: 'UserChatRecoil',
    default:[]
})

const modalUploadRecoil = atom({
    key: 'modalUploadRecoil',
    default:false
})

const errorCardUpload = atom({
    key: 'errorCardUpload',
    default:''
})

const UserDataExist = atom({
    key: 'UserDataExist',
    default: [],
})

export {MessagesRecoil, UserChatRecoil, UserDataExist,modalUploadRecoil,errorCardUpload};