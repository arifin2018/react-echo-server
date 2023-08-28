import React, { useEffect, useRef, useState } from 'react';
import Card from '../../Components/card'
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginAPI } from '../../Api/auth';
import { getCookie } from '../../Helpers/Cookie';


function LoginForm() {
    const passwordInput = useRef(false)
    const [password, setPassword] = useState(true);
    const register = useForm();
    let history = useNavigate();

    function showHide(e) {

        // console.log(register);
        if (password) {
            setPassword(false)
            passwordInput.current.type = 'text'
        }else{
            setPassword(true)
            passwordInput.current.type = 'password'
        }
    }

    function onChangePassword(e) {
        return register.setValue("password", e.target.value)
    }
    async function axiosPost(params) {
        await LoginAPI(params)
        history('/context')
    }

    useEffect(()=>{
    })

    return (
        <form method="post" className="space-y-3 p-3" onSubmit={register.handleSubmit(axiosPost)}>
            <div>
                <span className="block">Email :</span>
                <input type="text" {...register.register("email", {require:true})} id="email" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400" />
            </div>
            <div>
                <span className="block">Password :</span>
                <div className='relative'>
                    <input type="password" onChange={onChangePassword} id="password" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400 relative" ref={passwordInput}/>
                    <button type="button" className='absolute right-1 py-1' onClick={showHide}>
                        {
                            password === true ? 
                            <box-icon name='hide'></box-icon>
                            :
                            <box-icon name='show'></box-icon>
                        }
                    </button>
                </div>
            </div>
            <button type="submit" className='bg-cyan-600 p-1 rounded-md flex justify-end items-end end-0'>Submit</button>
        </form>
    )
};

function Login() {
    return <>
        <div className='flex justify-center h-[93%] items-center'>
            <Card loginForm={LoginForm()} className="m-auto"></Card>
        </div>
    </>
};

export default Login