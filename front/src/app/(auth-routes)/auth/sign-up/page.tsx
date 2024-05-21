"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import { fetchWrapper } from '../../../functions/fetch'
import { RiAdminLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const SignUp = ({action}:any) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("user")

    const router = useRouter()

    const datasUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        username: username,
    }

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()

        const fetchData = async () => {
            const response = await fetchWrapper('/auth/register', {
                method: 'POST',                       
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datasUser)
            });

            fetchData();

            if (response?.error) {
                console.log(response)
                return
            }

            router.replace('/playlist')
        }
    }

    return(

        <>
            <section>
                <div className="flex flex-col justify-center items-center min-w-full">
                    
                    <div className="my-10">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className='w-full rounded-md py-2.5 justify-center flex items-center'>
                        <button 
                            onClick={() => setRole("user")} type="button" className={`inline-flex items-center px-8 py-4 text-xl font-extrabold text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 ${role === 'user' ? 'text-white bg-gray-900' : 'text-gray-900 bg-transparent'}`}
                        >
                            <FaRegUser className="mr-2"/>
                            User
                        </button>
                        <button 
                            onClick={() => setRole("admin")} type="button" className={`inline-flex items-center px-8 py-4 text-xl font-extrabold text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 ${role === 'admin' ? 'text-white bg-gray-900' : 'text-gray-900 bg-transparent'}`}
                        >
                            <RiAdminLine className="mr-2 text-2xl"/>
                            Administrator
                        </button>

                    </div>

                    <div className="mb-10">
                        <form onSubmit={handleSubmit} className='my-10'>
                            
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
                                        value={username}
                                        onChange={(e:any) => setUsername(e.target.value)}
                                        placeholder="Enter your first name: "
                                        type="text"
                                        label="Username"
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