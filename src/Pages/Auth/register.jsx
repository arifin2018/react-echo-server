import { useRef, useState } from 'react';
import Card from '../../Components/card'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API from '../../Api';


function RegisterForm() {
    const passwordInput = useRef(false)
    const [password, setPassword] = useState(true);
    const register = useForm();

    function showHide(e) {
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
        try {
            await API({
                path: '/register',
                method: 'POST',
                params,
            })
            alert('register success')
        } catch (error) {
            alert(error.response.data.message)
            // alert('register failed')
        }
    }

    return (
        <form method="post" className="space-y-3 p-3" onSubmit={register.handleSubmit(axiosPost)}>
            <div>
                <span className="block">Name :</span>
                <input type="text" {...register.register("name", {required:"This is required name."})} id="name" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400" />
                <span className='text-sm text-red-500'>{register.formState.errors.name?.message}</span>
            </div>
            <div>
                <span className="block">Email :</span>
                <input type="text" {...register.register("email", {required:"This is required."})} id="email" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400" />
                <span className='text-sm text-red-500'>{register.formState.errors.email?.message}</span>
            </div>
            <div>
                <span className="block">Password :</span>
                <div className='relative'>
                    <input type="password" {...register.register("password", {required:"This is required."})} onChange={onChangePassword} id="password" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400 relative" ref={passwordInput}/>
                    <span className='text-sm text-red-500'>{register.formState.errors.password?.message}</span>
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

export default function register(params) {
    return <>
        <div className='flex justify-center h-[93%] items-center'>
            <Card loginForm={RegisterForm()} className="m-auto"></Card>
        </div>
    </>
};
