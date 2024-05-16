"use client"

import Button from "@/components/Button";
import AlbumCard from "@/components/Card/AlbumCard";
import CardLayout from "@/components/Card/CardLayout";
import Modal from "@/components/Dialogues/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useState } from "react";
import { PiMusicNotesPlusFill } from "react-icons/pi";

const Playlist = () => {

    const [openCardCreateAlbum, setOpenCardCreateAlbum] = useState(false)
    const [allAlbums, setAllAlbums] = useState([
        {
           nameArtist: 'Queen',
           nameAlbum: 'Bohemia',
           yearAlbum: '1982', 
        },
        {
            nameArtist: 'AC/DC',
            nameAlbum: 'Black',
            yearAlbum: '1989', 
        },
    ])

    const [artist, setArtist] = useState([
        {
            name: 'Leo'
        }
    ])
    const [nameAlbum, setNameAlbum] = useState("")
    const [yearAlbum, setYearAlbum] = useState("")

    const SaveNewAlbum = () => {

    }

    return(
        <CardLayout>
            <div className="p-10">
                <div
                    onClick={() => setOpenCardCreateAlbum(true)}
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
                        <AlbumCard
                            artist={album.nameArtist}
                            nameAlbum={album.nameAlbum}
                            yearAlbum={album.yearAlbum}
                        />
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