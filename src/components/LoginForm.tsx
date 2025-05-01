'use client';
export interface LoginFormProps {
    email: string;
    password: string;
}



import { AppDispatch, RootState } from '@/app/store';
import { loginThunk } from '@/lib/Redux-Toolkit/Thunks/LoginThunk';
import React, { useEffect } from 'react'   
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function LoginForm() {
    const {register, handleSubmit} =useForm<LoginFormProps>({
        defaultValues: {
            email: "",
            password: "",
        }})
    
    const dispatch = useDispatch<AppDispatch>();    
    const user = useSelector((state:RootState) => state.client.user);

    const onSubmit = (data: LoginFormProps) => {
        dispatch( loginThunk(data) );
        console.log(data);
        
        
    };

    useEffect(() => {console.log(user);}, [user]);

  return (
  
    <form className='' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-posta adresinizi giriniz.</label>
        <input id="email" type="email" 
            {...register("email",
                { 
                    required: "E-posta adresi zorunludur.", 

                    pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Lütfen geçerli bir e-posta adresi giriniz.",
                    },
                })
            } />
        <label htmlFor="password">Şifrenizi giriniz.</label>
        <input id="password" type="password" {...register("password", {required:"Şifre zorunludur.",
        minLength: {
            value: 6,
            message: "Şifre en az 6 karakter olmalıdır.",}
        })}/>
            
            <button type="submit">Gönder</button>
    </form>
 
)}

export default LoginForm;
