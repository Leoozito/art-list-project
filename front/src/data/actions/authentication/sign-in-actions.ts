"use client"
import * as z from 'zod';
import loginUserService from "../../services/authentication/sign-in-services";
import { redirect } from "next/navigation";

const loginSchema = z.object({
    email: z.string()
    .min(1, "This field is required")
    .email("Invalid email format"),

    password: z.string()
    .min(8, {message: 'Password must be at least 8 characters long'}),
})

export async function loginUserAction(prevState: any, formData: FormData) {
    const validatedFields = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
  
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing Fields. Failed to Register.",
      };
    }
  
    const responseData = await loginUserService(validatedFields.data);
  
    if (!responseData) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Ops! Something went wrong. Please try again.",
      };
    }
  
    if (responseData.error) {
      return {
        ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        message: "Failed to Register.",
      };
    }
    
    redirect("/playlist");
}