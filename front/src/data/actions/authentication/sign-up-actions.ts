"use server"
import * as z from 'zod';
import registerUserService from "../../services/authentication/sign-up-services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signUpSchema = z.object({
    firstName: z.string()
    .min(1, { message: "This field is required" }),
    
    lastName: z.string()
    .min(1, { message: "This field is required" }),
    
    username: z.string()
    .min(1, { message: "This field is required" })
    .regex(/^[A-Za-z]+$/i, "Only letters are allowed")
    .refine((val) => val.length < 5, { message: "The first name field requires a minimum of 5 characters" }),

    email: z.string()
    .email("Invalid email format")
    .refine((val) => val.length < 1, { message: "This field is required" }),

    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
    confirmPassword: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
})
.refine(({ password, confirmPassword}) => password === confirmPassword, {
    message: "Password confirmation does not match",
    path: ["confirm_password"]
});

export async function registerUserAction(prevState: any, formData: FormData) {
    const validatedFields = signUpSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        username: formData.get("username"),  
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });
  
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing Fields. Failed to Register.",
      };
    }
  
    const responseData = await registerUserService(validatedFields.data);
  
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
  
    cookies().set("jwt", responseData.jwt);
    redirect("/dashboard");
}