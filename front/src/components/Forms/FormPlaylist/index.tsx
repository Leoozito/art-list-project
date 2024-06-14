import Modal from "@/components/Dialogues/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { AlbumAction } from '@/data/actions/albums-actions/playlist-actions';
import { getAllArtistsService, newAlbumService, editAlbumService } from "@/data/services/album-services/playlist-service";
import { useSession } from "next-auth/react";

interface FormPlaylistProps {
    editAlbum: boolean
    openCard: boolean;
    albumEditDatas: { 
        artists: any, 
        nameAlbum: string, 
        yearAlbum: string 
    };
}

const INITIAL_STATE = {
    data: null,
    zodErrors: null,
    message: null,
};

const FormPlaylist:React.FC<FormPlaylistProps> = ({ albumEditDatas, editAlbum, openCard }) => {
    const { data: session } = useSession()
    const [allArtist, setAllArtist] = useState<any>()
    const [artist, setArtist] = useState<any>()
    const [nameAlbum, setNameAlbum] = useState("")
    const [yearAlbum, setYearAlbum] = useState("")

    useEffect(() => {
        setArtist(albumEditDatas?.artists)
        setNameAlbum(albumEditDatas?.nameAlbum)
        setYearAlbum(albumEditDatas?.yearAlbum)
    }, [albumEditDatas && editAlbum])

    useEffect(() => {
        const fetchArtists = async () => {
            const responseArtists = await getAllArtistsService();
            setAllArtist(responseArtists)
        }

        fetchArtists()
    }, [])

    const [formState, formAction] = useFormState(
        (prevState:any, formData:FormData) => 
        AlbumAction(session, prevState, formData),
        INITIAL_STATE
    );

    return(
        <>
            <Modal
                openModal={openCard}
            >
                <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form 
                        action={formAction}
                        className='space-y-10'
                    >
                        <Input
                            onChange={(e:any) => setNameAlbum(e.target.value)}
                            value={nameAlbum}
                            required={true}
                            label="Name of Album"
                            placeholder="Enter name of your album: "
                            id="nameAlbum"
                            name="nameAlbum"
                            type="nameAlbum"
                            error={formState?.zodErrors?.nameAlbum}

                        />
                        <Select
                            id="artist"
                            name="artist"
                            type="artist"
                            label="Artist of Album"
                            items={allArtist}
                            value={artist}
                            onChange={(e:any) => setArtist(e.target.value)}
                        />
                        <Input
                            onChange={(e:any) => setYearAlbum(e.target.value)}
                            value={yearAlbum}
                            required={true}
                            label="Year of Album"
                            placeholder="Enter year of your album: "
                            id="yearAlbum"
                            name="yearAlbum"
                            type="yearAlbum"
                            error={formState?.zodErrors?.yearAlbum}
                        />
                        <Button
                            text={editAlbum ? 'Edit this album' : 'Save new album'}
                        />
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default FormPlaylist;