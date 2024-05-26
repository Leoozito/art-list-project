import { signIn } from "next-auth/react";

interface LoginUserProps {
    email: string;
    password: string;
}

export default async function loginUserService(userDatas: LoginUserProps) {
    const response = await signIn('credentials',
    {
        userDatas,
        redirect: false
    })
    console.log(response)

    if (response?.error) {
        console.log(response)
        return
    }

    // router.replace('/playlist')
    return response;
}