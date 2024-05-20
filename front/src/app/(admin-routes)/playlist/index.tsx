"use client"

import { getToken } from '../../functions/token-action'
import { fetchWrapper } from '../../functions/fetch'
import Button from "@/components/Button";
import AlbumCard from "@/components/Card/AlbumCard";
import CardLayout from "@/components/Card/CardLayout";
import Modal from "@/components/Dialogues/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useEffect, useState } from "react";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import Pagination from '@/components/Pagination'

type PageProps = {
	searchParams?: {page?:string, limit?:string}
}

const Playlist = ({searchParams}:PageProps) => {
    const [openCardCreateAlbum, setOpenCardCreateAlbum] = useState(false)
    const [allAlbums, setAllAlbums] = useState([])
    const [artist, setArtist] = useState([])
    const [nameAlbum, setNameAlbum] = useState("")
    const [yearAlbum, setYearAlbum] = useState("")
    const [edit, setEdit] = useState(false)
    const page = Number(searchParams?.page) || 1;
    const limit = Number(searchParams?.limit) || 10;

    const datasAlbums = {
        album: {
            name_album:nameAlbum,
            artist: artist,
            year_album: yearAlbum
        }
    };

    const editAlbum = () => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper('/update', {
                    method: 'PUT',
                });
            } catch (error) {
                console.error('Error editing album: ', error);
            }
        };

        fetchData();
    }

    useEffect(() => {
        getAllAlbums();
        getAllArtists();
    }, [])

    const getAllArtists = () => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper('/artists', {
                    method: 'GET',
                });

                for (let i = 0; i < data.json.length; i++) {
                    setArtist(data.json[i][0].name)
                }
                console.log("LALALALALALOOLP: ",artist)
            } catch (error) {
                console.error('Error fetching artists: ', error);
            }
        };

        fetchData();
    }

    const getAlbumById = (id:any) => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper(`/albums/${id}`, {
                    method: 'GET',
                });
                setArtist(data.artist)
                setNameAlbum(data.name_album)
                setYearAlbum(data.year_album)
                setOpenCardCreateAlbum(!openCardCreateAlbum);
                setEdit(true)
                
            } catch (error) {
                console.error('Error fetching albums: ', error);
            }
        };

        fetchData();
    }

    const getAllAlbums = () => {
        const fetchData = async () => {
            try {
                const {data, metadata} = await fetchWrapper('/albums', {
                    method: 'GET',
                });
                console.log(metadata)
                setAllAlbums(data);
            } catch (error) {
                console.error('Error fetching albums: ', error);
            }
        };

        fetchData();
    }

    const saveNewAlbum = () => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper('/albums/create', {
                    method: 'POST',                       
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datasAlbums)
                });
            } catch (error) {
                console.error('Error when creating new album: ', error);
            }
        };

        fetchData();
    }

    return(
        <CardLayout>
            <div className="p-10">
                <div
                    onClick={() => setOpenCardCreateAlbum(!openCardCreateAlbum)}
                    className="cursor-pointer flex-col flex-grow mx-60 flex"
                >
                    <label className="block text-sm font-medium leading-6 text-gray-900">Create new album</label>
                    <div className="hover:bg-gray-100 flex-col flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 p-8 text-center sm:text-sm lg:text-lg leading-6 text-gray-600">
                        <PiMusicNotesPlusFill
                            className="mb-4 text-center text-8xl text-gray-300"
                        />
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                            <span>Click Here</span>
                        </label>
                        <p className="pl-1">And create a new album by your favorite artist</p>
                    </div>
                </div>
                <div className="mt-14 gap-12 grid sm:grid-cols-2 lg:grid-cols-3">
                    {allAlbums && (
                        allAlbums.map((album:any) =>                        
                        <AlbumCard
                            key={album.id}
                            onClick={getAlbumById(album.id)}
                            artist={album.artist}
                            nameAlbum={album.name_album}
                            yearAlbum={album.year_album}
                        />
                    ))}
                    <Pagination
                        page={page}
                        limit={limit}
                        total={2}
                    />
                </div>
            </div>
            {openCardCreateAlbum && (
                <Modal
                    openModal={openCardCreateAlbum}
                    onClose={() => setOpenCardCreateAlbum(false)}
                >
                    <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form 
                            onSubmit={edit ? editAlbum : saveNewAlbum} 
                            className='space-y-10'
                        >
                            <Input
                                label="Name of Album"
                                value={nameAlbum}
                                onChange={(e:any) => setNameAlbum(e.target.value)}
                            />

                            <Select
                                label="Artist of Album"
                                items={artist && (artist.map((artist:any) => {
                                    artist
                                }))}         
                            />

                            <Input
                                label="Year of Album"
                                value={yearAlbum}
                                onChange={(e:any) => setYearAlbum(e.target.value)}
                            />

                            <Button
                                text={edit ? 'Edit this album' : 'Save new album'}
                            />
                        </form>
                    </div>
                </Modal>
            )}
        </CardLayout>
    )
}

export default Playlist;