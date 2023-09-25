import { getDownloadURL, ref } from "@firebase/storage";
import { getImageStorage, storage } from "../Constant/firebase";
import { useState } from "react";

export default function Home() {
    const [imageurl, setImageurl] = useState();
    // let refff = ref(storage,'Chat/1lxe^Untitled.png')

    // getDownloadURL(refff)
    // .then((url) => {
        
    //     setImageurl(url)
    // })
    // .catch((error) => {
    //     // Handle any errors
    // });
        // let refff = ref(storage,'Chat/1lxe^Untitled.png')
        // getDownloadURL(refff)
        // .then((url) => {
        //     setImageurl(url)
        // })
        // .catch((error) => {
        //     // Handle any errors
        // });
        getImageStorage('Chat/1lxe^Untitled.png').
        then((url)=>{
            setImageurl(url)
        })
    return <h1 className="text-3xl font-bold underline">
        Hello world!
        <img src={imageurl} alt="" />

    </h1>
}
