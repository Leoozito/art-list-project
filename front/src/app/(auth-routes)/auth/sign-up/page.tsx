"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';

const SignUp = ({action}:any) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    // faltando username

    return(

        <>
            <section>
                <div className="flex flex-col justify-center items-center min-w-full">
                    
                    <div className="my-10">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className='ring-yellow-600 ring-1 bg-yellow-600/60 w-full rounded-md py-2.5 text-[#ffffff] justify-center flex items-center font-extrabold sm:text-2xl uppercase'>
                        <h1>User</h1>
                    </div>

                    <div className="mb-10">
                        <form onSubmit={action} className='my-10'>
                            
                            <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <Input
                                        required={true}
                                        value={firstName}
                                        onChange={(e:any) => setFirstName(e.target.value)}
                                        placeholder="Enter your first name: "
                                        type="text"
                                        label="First Name"
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <Input
                                        required={true}
                                        value={lastName}
                                        onChange={(e:any) => setLastName(e.target.value)}
                                        placeholder="Enter your last name: "
                                        type="text"
                                        label="Last Name"
                                    />
                                </div>
                            </div>
                            <div className='border-t border-gray-900/10 pt-12 mt-10 grid grid-cols-1 gap-12 sm:grid-cols-6'>
                                <div className="sm:col-span-3">
                                    <Input
                                        required={true}
                                        value={email}
                                        onChange={(e:any) => setEmail(e.target.value)}
                                        placeholder="Enter your email: "
                                        type="text"
                                        label="Email"
                                    />
                                </div> 
                                <div className="sm:col-span-3">
                                    <Input
                                        required={true}
                                        value={password}
                                        onChange={(e:any) => setPassword(e.target.value)}
                                        placeholder="Enter a password for your account: "
                                        type="text"
                                        label="Password"
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <Input
                                        required={true}
                                        value={confirmPassword}
                                        onChange={(e:any) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password: "
                                        type="text"
                                        label="Confirm Password"
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