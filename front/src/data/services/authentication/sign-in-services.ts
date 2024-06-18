import { signIn } from "next-auth/react";

interface LoginUserProps {
    email: string;
    password: string;
}

export default async function loginUserService(userDatas: LoginUserProps) {

    const email = userDatas.email
    const password = userDatas.password
    
    const response = await signIn('credentials',
    {
        email, 
        password,
        redirect: false
    })

    if (response?.error) {
        return response
    }

    return response;
}