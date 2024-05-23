"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { fetchWrapper } from '../../../functions/fetch'
import { RiAdminLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const SignUp = () => {

    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    // const [username, setUsername] = useState("")
    const [role, setRole] = useState("user")

    const router = useRouter()

    // const datasUser = {
    //     full_name: `${firstName} ${lastName}`,
    //     email: email,
    //     password: password,
    //     username: username,
    //     role: role
    // }

    const schema = z.object({
        firstName: z.string({message: "This fields is required"}),
        lastName: z.string({message: "This fields is required"}),
        
        username: z.string({message:"This field is required"})
        .regex(/^[A-Za-z]+$/i, "Only letters are allowed"),
        email: z.string({message:"This field is required"})
        .email("Invalid email format"),

        password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
        confirmPassword: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
    })
    .refine(({ password, confirmPassword}) => password === confirmPassword, {
        message: "A confirmação de senha não corresponde",
        path: ["confirm_password"]
    });

    type createUserFormData = z.infer<typeof schema>

    const { register, handleSubmit, formState: { errors }, watch } = useForm<createUserFormData>({
        resolver: zodResolver(schema)
    });

    function registerUser(data:any) {
        // console.log("ALOOO",data)
        const fetchData = async () => {
            const response = await fetchWrapper('/auth/register', {
                method: 'POST',                       
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(datasUser)
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
                        <form onSubmit={handleSubmit(registerUser)} className='my-10'>
                            
                            <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <Input
                                        placeholder="Enter your first name: "
                                        type="text"
                                        label="First Name"
                                        {...register("firstName")}
                                        error={errors.firstName}
                                    />

                                </div>
                                <div className="sm:col-span-3">
                                    <Input
                                        {...register("lastName")}
                                        placeholder="Enter your last name: "
                                        type="text"
                                        label="Last Name"
                                        error={errors.lastName}
                                    />
                                </div>
                            </div>
                            <div className='border-t border-gray-900/10 pt-12 mt-10 grid grid-cols-1 gap-12 sm:grid-cols-6'>
                                <div className="sm:col-span-3">
                                    <Input
                                        // required={true}
                                        {...register("email")}
                                        placeholder="Enter your email: "
                                        type="text"
                                        label="Email"
                                        error={errors.email}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <Input
                                        // required={true}
                                        {...register("username")}
                                        placeholder="Enter your first name: "
                                        type="text"
                                        label="Username"
                                        error={errors.username}
                                    />
                                </div> 
                                <div className="sm:col-span-3">
                                    <Input
                                        // required={true}
                                        {...register("password")}
                                        placeholder="Enter a password for your account: "
                                        type="text"
                                        label="Password"
                                        error={errors.password}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <Input
                                        // required={true}
                                        {...register("confirmPassword")}
                                        placeholder="Confirm your password: "
                                        type="text"
                                        label="Confirm Password"
                                        error={errors.confirmPassword}
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