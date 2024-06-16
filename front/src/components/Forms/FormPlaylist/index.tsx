import Modal from "@/components/Dialogues/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useEffect, useState, useRef } from "react";
import { useFormState } from "react-dom";
import { AlbumAction } from '@/data/actions/albums-actions/playlist-actions';
import { getAllArtistsService } from "@/data/services/album-services/playlist-service";
import ConfirmAlertDialog from "@/components/Dialogues/ConfirmAlertDialog";
import AlertDialog from "@/components/Dialogues/AlertDialog";
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
    const formRef = useRef(null);
    const [allArtist, setAllArtist] = useState<any>()
    
    const [artist, setArtist] = useState<any>()
    const [nameAlbum, setNameAlbum] = useState("")
    const [yearAlbum, setYearAlbum] = useState("")

    const [cardForm, setCardForm] = useState(openCard);
    const [modalConfirmAlert, setModalConfirmAlert] = useState(false);
    const [modalSucess, setModalSucess] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [modalConteudo, setModalConteudo] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        if (openCard) {
            setCardForm(openCard)
        }
    },[openCard])

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

    const handleSubmit = (e:any) => {
        e.preventDefault(); 
        setModalConteudo({
            title: 'Criar novo álbum',
            description: 'Deseja prosseguir na criação de um novo álbum?'
        });
        setModalConfirmAlert(true);
    };

    const handleConfirm = async () => {
        setCardForm(false)
        setModalConfirmAlert(false);
        try {
            // const response = await formAction();
            // console.log(response)
            setModalConteudo({
                title: 'Sucesso',
                description: 'Album novo criado'
            });
            setModalSucess(true)
        } catch (error) {
            // console.error("DEU RUIM>>>>>>>>>> ", error)
        }
    };

    const handleCancel = () => {
        setModalConfirmAlert(false);
    };

    return(
        <>
            <ConfirmAlertDialog
                actionConfirm={handleConfirm}
                actionCancel={handleCancel}
                content={modalConteudo}
                alert={modalConfirmAlert}
            />
            <AlertDialog
                content={modalConteudo}
                sucess={modalSucess}
                error={modalError}
            />
            <Modal
                openModal={cardForm}
            >
                <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form 
                        ref={formRef}
                        onSubmit={handleSubmit}
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