"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import CardLayout from '@/components/Card/CardLayout';
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";

const Login = ({action}:any) => {
    
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter()

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()

        const result = await signIn('credentials',
        {
            email,
            password,
            // redirect: false
        })

        if (result?.error) {
            console.log(result)
            return
        }
  
        router.replace('/playlist')
    }

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
                                <form onSubmit={handleSubmit} className='my-10 space-y-6'>
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
                                    <Button 
                                        text="Log In"
                                    />
                                    <p className="text-lg font-semibold text-gray-900">Don't have an account with us yet?</p>
                                    <p className="text-lg font-semibold text-indigo-600">Click here and register</p>
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