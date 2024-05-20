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

const Playlist = () => {
    const [openCardCreateAlbum, setOpenCardCreateAlbum] = useState(false)
    const [allAlbums, setAllAlbums] = useState([])
    const [artist, setArtist] = useState([
        {
            name: 'Leo'
        }
    ])
    const [nameAlbum, setNameAlbum] = useState("")
    const [yearAlbum, setYearAlbum] = useState("")
    // const token = getToken();

    const datasAlbums = {
        album: {
            name_album:nameAlbum,
            artist: artist,
            year_album: yearAlbum
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper('/albums', {
                    method: 'GET',
                });
                setAllAlbums(data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };

        fetchData();
    }, [])

    const SaveNewAlbum = () => {
        const fetchData = async () => {
            try {
                const data = await fetchWrapper('/albums/create', {
                    method: 'POST',                       
                    headers: {
                        // 'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datasAlbums)
                });
            } catch (error) {
                console.error('Error fetching albums:', error);
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
                            <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                        </label>
                        <p className="pl-1">And create a new album by your favorite artist</p>
                    </div>
                </div>
                <div className="mt-14 gap-12 grid grid-cols-3">
                    {allAlbums.map((album:any) =>                        
                        {
                        console.log("AAAAAAAAAA",album)
                        return(
                        
                        <AlbumCard
                            artist={album.artist}
                            nameAlbum={album.name_album}
                            yearAlbum={album.year_album}
                        />)}
                    )}
                </div>
            </div>
            {openCardCreateAlbum && (
                <Modal
                    openModal={openCardCreateAlbum}
                    onClose={() => setOpenCardCreateAlbum(false)}
                >
                    <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form 
                            onSubmit={SaveNewAlbum} 
                            className='space-y-10'
                        >
                            <Input
                                label="Name of Album"
                                value={nameAlbum}
                                onChange={(e:any) => setNameAlbum(e.target.value)}
                            />

                            <Select
                                label="Artist of Album"
                                items={artist.map(artist => artist.name)}             
                            />

                            <Input
                                label="Year of Album"
                                value={yearAlbum}
                                onChange={(e:any) => setYearAlbum(e.target.value)}
                            />

                            <Button
                                text="Save new album"
                            />
                        </form>
                    </div>
                </Modal>
            )}
        </CardLayout>
    )
}

export default Playlist;