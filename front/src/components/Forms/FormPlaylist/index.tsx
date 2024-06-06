import Modal from "@/components/Dialogues/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useState } from "react";
import { useFormState } from "react-dom";
import { AlbumAction } from '@/data/actions/albums-actions/playlist-actions';
import { fetchWrapper } from '../../../app/functions/fetch'

interface FormPlaylistProps {
    editAlbum: boolean
    openCard: boolean;
    albumData: { 
        artist: string, 
        nameAlbum: string, 
        yearAlbum: string 
    };
}

const INITIAL_STATE = {
    data: null,
    zodErrors: null,
    message: null,
};

const FormPlaylist:React.FC<FormPlaylistProps> = ({ albumData, editAlbum, openCard }) => {
    
    const [artist, setArtist] = useState<any[]>([])
    const [nameAlbum, setNameAlbum] = useState("")
    const [yearAlbum, setYearAlbum] = useState("")

    const [formState, formAction] = useFormState(
        AlbumAction,
        INITIAL_STATE
    );

    console.log("YEAH TODOS OS DADOS DO ALBUM: ", albumData)
    
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
                            required={true}
                            label="Name of Album"
                            placeholder="Enter name of your album: "
                            id="nameAlbum"
                            name="nameAlbum"
                            type="nameAlbum"
                            error={formState?.zodErrors?.nameAlbum}

                        />
                        <Select
                            label="Artist of Album"
                            items={artist}         
                        />
                        <Input
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