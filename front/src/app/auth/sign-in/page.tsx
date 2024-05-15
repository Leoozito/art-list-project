"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';

const Login = ({action}:any) => {
    
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
    return(

        <>
            <section>
                <div className="flex flex-col justify-center items-center border border-gray-700 rounded-lg w-[600px] h-[600px]">
                    
                    <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={action} className='my-10 space-y-6'>
                            <Input
                                required={true}
                                value={email}
                                onChange={(e:any) => setEmail(e.target.value)}
                                placeholder="Enter your email: "
                                type="text"
                                label="Email"
                            />
                            <Input
                                required={true}
                                value={password}
                                onChange={(e:any) => setPassword(e.target.value)}
                                placeholder="Enter your password: "
                                type="text"
                                label="Password"
                            />
                            <Button text="Log In"/>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;