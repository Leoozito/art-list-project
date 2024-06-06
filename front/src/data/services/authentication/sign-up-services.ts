import { fetchWrapper } from '../../../app/functions/fetch'

interface RegisterUserProps {
    full_name: {
        firstName:string,
        lastName: string,
    };
    role: string;
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
        return
    }

    return response;
}
