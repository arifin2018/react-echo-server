import { atom } from "recoil";

const dataUser = atom({
    key: 'dataUser',
    default: [],
});

export {dataUser}