import React, { useEffect, useRef, useState } from 'react';
import Card from '../../Components/card'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../../Api/auth';
import { ErrorMessage } from '@hookform/error-message';


function LoginForm() {
    const [password, setPassword] = useState('password');
    const [api, setApi] = useState('');
    const {
        register, 
        handleSubmit,
        setError,
        formState: { errors }} = useForm({
            defaultValues:{
                email: ""
            },
            criteriaMode:'all'
        });
    let history = useNavigate();

    function showHide(e) {
        if (password === 'password') {
            return setPassword('text')
        }else{
            return setPassword('password')
        }
    }

    async function axiosPost(params,e) {
        e.preventDefault();
        console.log('a');
        try {
            await LoginAPI(params)
            history('/context')
            return true
        } catch (error) {
            setApi(error?.response?.data?.error)
            return false
        }
    }


    return (
        <form method="post" className="space-y-3 p-3" onSubmit={handleSubmit(axiosPost)}>
            { api !== '' ?  <p className="text-red-600">{api}</p> : <></>}
            <div>
                <span className="block">Email :</span>
                <input type="text" {...register("email", { 
                    required: "This is required.",
                    })} id="email" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400" />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <p className="text-red-600">{message}</p>}
                />  
            </div>
            <div>
                <span className="block">Password :</span>
                <div className='relative'>
                    <input type={password} {...register("password", { required: "This is required." })} id="password" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400 relative"/>
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p className="text-red-600">{message}</p>}
                    />
                    <button type="button" className='absolute right-1 py-1' onClick={showHide}>
                        {
                            password === 'text' ? 
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