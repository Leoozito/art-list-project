import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request:Request) {
    try {
        const { 
            firstName, lastName, email, password, username,
        } = await request.json()

        const hashPassword = await hash(password, 10)
    } catch (err) {
        return({err})
    }

    return NextResponse.json({message:'sucess'})
}