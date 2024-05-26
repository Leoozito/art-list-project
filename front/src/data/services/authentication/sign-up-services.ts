
import { fetchWrapper } from '../../../app/functions/fetch'

interface RegisterUserProps {
    firstName:string,
    lastName: string,
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default async function registerUserService(userDatas: RegisterUserProps) {
    const response = await fetchWrapper('/auth/register', {
        method: 'POST',                       
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDatas)
    });

    if (response?.error) {
        console.log(response)
        return
    }

    // router.replace('/playlist')
    return response.json();
}
