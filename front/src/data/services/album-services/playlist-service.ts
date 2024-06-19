import { fetchWrapper } from '../../../app/functions/fetch'

interface AlbumProps {
    name_album: string,
    year_album: string,
    artist: string,
}

async function getAllArtistsService() 
{
    try {
        const data = await fetchWrapper('/artists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let AllArtistNames = [];

        for (let i = 0; i < data.json.length; i++) {
            for (let j = 0; j < data.json[i].length; j++) {
                AllArtistNames.push(data.json[i][j].name);
            }
        }
        return AllArtistNames
    } catch (error) {
        return error;
    }
}

async function getAllAlbumsService(page:number, limit:number, session:any) 
{
    const userId = session?.user?.id;

    try {
        if (userId) {
            const queryParams = new URLSearchParams({
                page: page?.toString(),
                limit: limit?.toString(),
                user_id: userId?.toString()
            })?.toString();

            const response = await fetchWrapper(`/albums?${queryParams}`, {
                method: 'GET',
            });
            return response;
        } else {
            return "Error when querying user data"
        }
    } catch (error) {
        return error;
    }
}

async function getAlbumByIdService(id:number) 
{
    try {
        const response = await fetchWrapper(`/albums/${id}`, {
            method: 'GET',
        });
        console.log("RESPOSTA",response)
        return response;
    } catch (error) {
        return error;
    }
}

async function newAlbumService(albumDatas: AlbumProps) 
{    
    const response = await fetchWrapper('/albums/create', {
        method: 'POST',                       
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumDatas)
    });

    return response.json
}

async function editAlbumService(id:number, albumDatas: AlbumProps) 
{
    try {
        const response = await fetchWrapper(`/update/${id}`, {
            method: 'PUT',
        });
        return response
    } catch (error) {
        return error;
    }
}

async function deleteAlbumService(id:number) 
{
    try {
        const response = await fetchWrapper(`/delete/${id}`, {
            method: 'DELETE',
        });
        return response
    } catch (error) {
        return error;
    }
}

export { getAllArtistsService, getAllAlbumsService, getAlbumByIdService, newAlbumService, editAlbumService, deleteAlbumService };
