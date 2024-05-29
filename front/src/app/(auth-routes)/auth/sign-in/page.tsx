"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import CardLayout from '@/components/Card/CardLayout';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from "react-dom";
import { loginUserAction } from '@/data/actions/authentication/sign-in-actions';

const INITIAL_STATE = {
    data: null,
    zodErrors: null,
    message: null,
};

const Login = ({action}:any) => {

    const router = useRouter()

    const [formState, formAction] = useFormState(
        loginUserAction,
        INITIAL_STATE
    );
    
    return(

        <>
            <section>
                <div
                    className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:px-80 fixed inset-0 z-10 overflow-y-auto"
                >
                    <CardLayout>
                        <div className='w-[600px]'>
                            <div className="my-8 sm:mx-auto sm:w-full sm:max-w-xl">
                                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                            </div>
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <form 
                                    action={formAction}
                                    className='my-10 space-y-6'
                                >
                                    <Input
                                        required={true}
                                        placeholder="Enter your email: "
                                        label="Email"
                                        id="email"
                                        name="email"
                                        type="email"
                                    />
                                    {formState?.zodErrors?.email &&
                                        <span className="">
                                            {formState?.zodErrors?.email?.err}
                                        </span>
                                    }
                                    <Input
                                        required={true}
                                        placeholder="Enter your password: "
                                        label="Password"
                                        id="password"
                                        name="password"
                                        type="password"
                                    />
                                    {formState?.zodErrors?.password &&
                                        <span className="">
                                            {formState?.zodErrors?.password?.err}
                                        </span>
                                    }
                                    <Button 
                                        text="Log In"
                                    />
                                    <p className="text-lg font-semibold text-gray-900">Don't have an account with us yet?</p>
                                    <p className="text-lg font-semibold text-indigo-600 cursor-pointer" onClick={() => router.replace('/auth/sign-up')}>Click here and register</p>
                                </form>
                            </div>
                        </div>
                    </CardLayout>
                </div>
            </section>
        </>
    )
}

export default Login;