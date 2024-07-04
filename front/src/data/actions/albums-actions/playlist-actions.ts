"use client"
import * as z from 'zod';
import {newAlbumService, editAlbumService} from "../../services/album-services/playlist-service";

const AlbumSchema = z.object({
    name_album: z.string()
    .min(1, { message: "This field is required" }),
    year_album: z.string()
    .min(1, { message: "This field is required" }),
})

export async function AlbumAction(userId:number | undefined, editAlbum:boolean, prevState: any, formData: FormData) {
    const user_id = userId
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
      user_id: user_id
    }

    const albumData = {
      ...validatedFields.data,
      ...additionalData
    };

    if (editAlbum) {
      await editAlbumService(0, albumData)
    } else {
      await newAlbumService(albumData)
    }
}
