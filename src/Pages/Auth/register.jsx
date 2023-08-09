import { useEffect, useRef, useState } from 'react';
import Card from '../../Components/card'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';


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

    function axiosPost(params) {
        // console.log(({ message }) => <h1>{message}</h1>);
        return ({message}) => console.log(message.message);
    }
    useEffect(()=>{
        console.log(register.formState.errors.name);
    })

    return (
        <form method="post" className="space-y-3 p-3" onSubmit={register.handleSubmit(axiosPost)}>
            <div>
                <span className="block">Name :</span>
                <input type="text" {...register.register("name", {required:"This is required name."})} id="name" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400" />
                <ErrorMessage errors={register.formState.errors} name='singleErrorInput'>  </ErrorMessage>
                <ErrorMessage
                    errors={register?.formState?.errors}
                    name="singleErrorInput"
                    render={({ message }) => <p>{message.message}</p>}
                />
            </div>
            <div>
                <span className="block">Email :</span>
                <input type="text" {...register.register("email", {required:"This is required."})} id="email" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400" />
            </div>
            <div>
                <span className="block">Password :</span>
                <div className='relative'>
                    <input type="password" {...register.register("password", {required:"This is required."})} onChange={onChangePassword} id="password" className="w-full border-spacing-0 border-0 bg-slate-300 rounded-md p-1 focus:outline-1 focus:outline-gray-400 relative" ref={passwordInput}/>
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
