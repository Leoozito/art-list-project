"use client"

import { getDataCookie } from '../../functions/token-action'
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type PageProps = {
	searchParams?: {page?:string, limit?:string}
}

const Playlist = ({searchParams}:PageProps) => {
    const [openCardCreateAlbum, setOpenCardCreateAlbum] = useState(false)
    const [allAlbums, setAllAlbums] = useState([])
    const [artist, setArtist] = useState([])
    const [nameAlbum, setNameAlbum] = useState("")
    const [yearAlbum, setYearAlbum] = useState("")
    const [userId, setUserId] = useState<any>()

    const [edit, setEdit] = useState(false)
    const [userIsAdm, setUserIsAdm] = useState(false)

    const page = Number(searchParams?.page) || 1;
    const limit = Number(searchParams?.limit) || 10;

    const datasAlbums = {
        album: {
            name_album:nameAlbum,
            artist: artist,
            year_album: yearAlbum,
            user_id : userId
        }
    };

    // part of validations
    const schema = z.object({
        nameAlbum: z.string()
        .nonempty("Campo obrigatório!"),
        yearAlbum: z.string()
        .nonempty("Campo obrigatório!")
    })

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(schema)
    });

    const deleteAlbumById = (id:any) => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper(`/delete/${id}`, {
                    method: 'DELETE',
                });

            } catch (error) {
                console.error('Error delete album: ', error);
            }
        };

        fetchData();
    }


    const editAlbum = (id:any) => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper(`/update/${id}`, {
                    method: 'PUT',
                });

            } catch (error) {
                console.error('Error editing album: ', error);
            }
        };

        fetchData();
    }

    const typeUser = async () => {
        const role_user = await getDataCookie('role')
        const id_user = await getDataCookie("id")
        setUserId(id_user)

        if (role_user == "admin") {
            setUserIsAdm(true)
        } else {
            setUserIsAdm(false)
        }
    }

    useEffect(() => {
        typeUser()
        getAllAlbums();
        getAllArtists();
    }, [])

    const getAllArtists = () => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper('/artists', {
                    method: 'GET',
                })

                for (let i = 0; i < data.json.length; i++) {
                    for (let j = 0; j < data.json[i].length; j++) {
                        setArtist(data.json[i][j].name)
                        console.log(data.json[i][j].name)
                    }
                }

                console.log('ALOOO',artist)
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
                const { data } = await fetchWrapper('/albums', {
                    method: 'GET',
                });
                console.log("LISTA ALBUMS" , data)
                setAllAlbums(data.albums);
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
                            isAdm={userIsAdm}
                            key={album.id}
                            onDelete={() => deleteAlbumById(album.id)}
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
                            onSubmit={edit ? handleSubmit(editAlbum) : handleSubmit(saveNewAlbum)} 
                            className='space-y-10'
                        >
                            <Input
                                label="Name of Album"
                                value={nameAlbum}
                                {...register("nameAlbum")}
                            />
                            {errors.firstName && <span className="message-error">{errors?.nameAlbum?.message?.toString()}</span>}

                            <Select
                                label="Artist of Album"
                                items={artist}         
                            />

                            <Input
                                label="Year of Album"
                                value={yearAlbum}
                                {...register("yearAlbum")}
                            />
                            {errors.firstName && <span className="message-error">{errors?.yearAlbum?.message?.toString()}</span>}

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