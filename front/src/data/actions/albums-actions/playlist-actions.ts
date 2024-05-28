"use server"
import * as z from 'zod';
import newAlbumService from "../../services/album-services/playlist";

const AlbumSchema = z.object({
    nameAlbum: z.string()
    .min(1, { message: "This field is required" }),
    yearAlbum: z.string()
    .min(1, { message: "This field is required" }),
})

export async function AlbumAction(prevState: any, formData: FormData) {
    const validatedFields = AlbumSchema.safeParse({
        nameAlbum: formData.get("nameAlbum"),
        yearAlbum: formData.get("yearAlbum"),
    });
  
    console.log("DADOOS: ",formData, "AND", prevState)

    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing Fields. Failed to Register.",
      };
    }

    // const additionalData = {
    //   artist: formData.get("artist"),
    //   user_id: formData.get("user_id") 
    // }

    // const albumData = {
    //   ...validatedFields.data,
    //   ...additionalData,
    // };
  
    await newAlbumService(validatedFields.data)
    .then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  
}
