"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import CardLayout from '@/components/Card/CardLayout';
import { useFormState } from "react-dom";
import { loginUserAction } from '@/data/actions/authentication/sign-in-actions';
import Link from 'next/link';

const INITIAL_STATE = {
    data: null,
    zodErrors: null,
    message: null,
};

const Login = () => {

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
                                        error={formState?.zodErrors?.email}
                                    />
                                    <Input
                                        required={true}
                                        placeholder="Enter your password: "
                                        label="Password"
                                        id="password"
                                        name="password"
                                        type="password"
                                        error={formState?.zodErrors?.password}
                                    />
                                    <Button 
                                        text="Log In"
                                    />
                                    <p className="text-lg font-semibold text-gray-900">Don't have an account with us yet?</p>
                                    <Link 
                                        href='/auth/sign-up' 
                                    >
                                        Click here and register
                                    </Link>
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