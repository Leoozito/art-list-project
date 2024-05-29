import { fetchWrapper } from '../../../app/functions/fetch'

interface AlbumProps {
    nameAlbum: string,
    yearAlbum: string,
    artist: string,
    user_id : number
}

export default async function newAlbumService(albumDatas: AlbumProps) 
{
    // console.log("ALBUMM TESTE:", albumDatas)
    const response = await fetchWrapper('/albums/create', {
        method: 'POST',                       
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumDatas)
    });

    return response.json
}