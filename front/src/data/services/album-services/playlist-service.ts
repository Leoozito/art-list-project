import { useState } from 'react';
import { fetchWrapper } from '../../../app/functions/fetch'

interface AlbumProps {
    nameAlbum: string,
    yearAlbum: string,
    artist: string,
    user_id : number
}

async function getAllArtistsService() 
{
    try {
        const data = await fetchWrapper('/artists', {
            method: 'GET',
        })

        for (let i = 0; i < data.json.length; i++) {
            for (let j = 0; j < data.json[i].length; j++) {
                return data?.json[i][j]?.name
            }
        }
    } catch (error) {
        console.error('Error fetching artists: ', error);
    }
}

async function getAllAlbumsService(page:number, limit:number, user_id:number) 
{
    try {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            user_id: user_id.toString()
        }).toString();

        const response = await fetchWrapper(`/albums?${queryParams}`, {
            method: 'GET',
        });
        console.log("LISTA ALBUMS: ", response)
        return response;
    } catch (error) {
        console.error('Error fetching albums: ', error);
    }
}

async function getAlbumByIdService(id:number) 
{
    try {
        const response = await fetchWrapper(`/albums/${id}`, {
            method: 'GET',
        });
        return response;
    } catch (error) {
        console.error('Error fetching albums: ', error);
    }
}


async function newAlbumService(albumDatas: AlbumProps) 
{
    console.log("ALBUMM TESTE:", albumDatas)
    
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
        console.error('Error editing album: ', error);
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
        console.error('Error delete album: ', error);
    }

}

export { getAllArtistsService, getAllAlbumsService, getAlbumByIdService, newAlbumService, editAlbumService, deleteAlbumService };
