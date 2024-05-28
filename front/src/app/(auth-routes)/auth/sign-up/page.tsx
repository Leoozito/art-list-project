"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';
import { RiAdminLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { registerUserAction } from '@/data/actions/authentication/sign-up-actions';
import { useFormState } from "react-dom";

const INITIAL_STATE = {
    data: null,
    zodErrors: null,
    message: null,
};

const SignUp = () => {
    
    const [formState, formAction] = useFormState(
        registerUserAction,
        INITIAL_STATE
    );

    const [role, setRole] = useState("user")

    return(

        <>
            <section>
                <div className="flex flex-col justify-center items-center min-w-full">
                    
                    <div className="my-10">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className='w-full rounded-md py-2.5 justify-center flex items-center'>
                        <button 
                            onClick={() => setRole("user")} type="button" className={`inline-flex items-center px-8 py-4 text-xl font-extrabold text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ${role === 'user' ? 'text-white bg-gray-900' : 'text-gray-900 bg-[#ffffff]'}`}
                        >
                            <FaRegUser className="mr-2"/>
                            User
                        </button>
                        <button 
                            onClick={() => setRole("admin")} type="button" className={`inline-flex items-center px-8 py-4 text-xl font-extrabold text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ${role === 'admin' ? 'text-white bg-gray-900' : 'text-gray-900 bg-[#ffffff]'}`}
                        >
                            <RiAdminLine className="mr-2 text-2xl"/>
                            Administrator
                        </button>

                    </div>

                    <div className="mb-10">
                        <form 
                            action={formAction}
                            className='my-10'
                        >
                            
                            <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <Input
                                        placeholder="Enter your first name: "
                                        label="First Name"
                                        id="firstName"
                                        name="firstName"
                                        type="firstName"
                                        error={formState?.zodErrors?.firstName}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <Input
                                        placeholder="Enter your last name: "
                                        label="Last Name"
                                        id="lastName"
                                        name="lastName"
                                        type="lastName"
                                        error={formState?.zodErrors?.lastName}
                                    />
                                </div>
                            </div>
                            <div className='border-t border-gray-900/10 pt-12 mt-10 grid grid-cols-1 gap-12 sm:grid-cols-6'>
                                <div className="sm:col-span-3">
                                    <Input
                                        placeholder="Enter your email: "
                                        label="Email"
                                        id="email"
                                        name="email"
                                        type="email"
                                        error={formState?.zodErrors?.email}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <Input
                                        placeholder="Enter your first name: "
                                        label="Username"
                                        id="username"
                                        name="username"
                                        type="username"
                                        error={formState?.zodErrors?.username}
                                    />
                                </div> 
                                <div className="sm:col-span-3">
                                    <Input
                                        placeholder="Enter a password for your account: "
                                        label="Password"
                                        id="password"
                                        name="password"
                                        type="password"
                                        error={formState?.zodErrors?.password}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <Input
                                        placeholder="Confirm your password: "
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="confirmPassword"
                                        error={formState?.zodErrors?.confirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="mt-10">
                                <Button 
                                    text="Register Account"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp;