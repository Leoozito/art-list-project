"use client"
import * as z from 'zod';
import {newAlbumService} from "../../services/album-services/playlist-service";

const AlbumSchema = z.object({
    name_album: z.string()
    .min(1, { message: "This field is required" }),
    year_album: z.string()
    .min(1, { message: "This field is required" }),
})

export async function AlbumAction(session:any ,prevState: any, formData: FormData) {
    const userId = session?.user?.id
    console.log(formData)
    const validatedFields = AlbumSchema.safeParse({
        name_album: formData.get("nameAlbum"),
        year_album: formData.get("yearAlbum"),
    });
  
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing Fields. Failed to Register.",
      };
    }

    const additionalData = {
      artist: String(formData.get("artist")),
      user_id: userId
    }

    const albumData = {
      ...validatedFields.data,
      ...additionalData
    };
    console.log("DADOS POST>", albumData)
    await newAlbumService(albumData)
  
}
