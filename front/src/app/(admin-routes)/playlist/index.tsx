"use client"

// services
import { getAllArtistsService, getAllAlbumsService, getAlbumByIdService, newAlbumService, editAlbumService, deleteAlbumService } from "@/data/services/album-services/playlist-service"
import { useEffect, useState } from "react";
import { getDataCookie } from '../../functions/token-action'
// components
import FormPlaylist from "@/components/Forms/FormPlaylist";
import AlbumCard from "@/components/Card/AlbumCard";
import CardLayout from "@/components/Card/CardLayout";
import AlertDialog from "@/components/Dialogues/AlertDialog";
import Pagination from '@/components/Pagination'
// Icons
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { LuAlertTriangle } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegRectangleXmark } from "react-icons/fa6";

type PageProps = {
	searchParams?: {page?:string, limit?:string}
}    

const Playlist = ({searchParams}:PageProps) => {
    const [allAlbums, setAllAlbums] = useState<any[]>([])
    
    const [userId, setUserId] = useState<any>()
    const [typeRole, setTypeRole] = useState<any>()
    
    const page = Number(searchParams?.page) || 1;
    const limit = Number(searchParams?.limit) || 10;
    
    const [openCardCreateAlbum, setOpenCardCreateAlbum] = useState<boolean>(false)
    const [edit, setEdit] = useState(false)
    
    const [modalSucess, setModalSucess] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [modalConteudo, setModalConteudo] = useState("")

    const closeModal = () => {
        setModalSucess(false)
        setModalError(false)
        setModalAlert(false)
    }

    const typeUser = async () => {
        const role_user = await getDataCookie('role')
        const id_user = await getDataCookie("id")
        setUserId(id_user)
        setTypeRole(role_user)
    }

    useEffect(() => {
        typeUser()

        const fetchArtists = async () => {
            const { datasAlbums, metadata } = await getAllAlbumsService(page, limit, userId);
            setAllAlbums(datasAlbums);

            const responseArtists = await getAllArtistsService();
            // setArtist(responseArtists)
        };

        fetchArtists()
    }, [])

    const getAlbumById = async (id:number) => {
        try {
            const data = await getAlbumByIdService(id);

            // setArtist(data.artist)
            // setNameAlbum(data.name_album)
            // setYearAlbum(data.year_album)
        } catch (error:any) {
            console.error(`Error when querying album data, ID: ${id}`,error);
        }
    }

    return(
        <>
            // Part of cards message
            {!modalSucess && (
                <AlertDialog
                    onClose={closeModal}
                    conteudo={modalConteudo}
                    openModal={modalSucess}
                    icon={<FaRegCircleCheck/>}
                    iconColor="#16a34a"
                />
            )}
            {modalAlert && (
                <AlertDialog
                    onClose={closeModal}
                    title="Alerta"
                    conteudo={modalConteudo}
                    openModal={modalAlert}
                    icon={<LuAlertTriangle/>}
                    iconColor="#facc15"
                />
            )}
            {modalError && (
                <AlertDialog
                    onClose={closeModal}
                    title="Erro ao efetuar o registro"
                    conteudo={modalConteudo}
                    openModal={modalError}
                    icon={<FaRegRectangleXmark/>}
                    iconColor="#ef4444"
                />
            )}

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
                                isAdm={typeRole}
                                key={album.id}
                                onDelete={() => deleteAlbumService(album.id)}
                                onClick={getAlbumById(album.id)}
                                artist={album.artist}
                                nameAlbum={album.name_album}
                                yearAlbum={album.year_album}
                            />
                        ))}
                    </div>
                    <Pagination
                        page={page}
                        limit={limit}
                        total={2} // metadata.pagination.total
                    />
                </div>
                <FormPlaylist
                    openCard={openCardCreateAlbum}
                    editAlbum={edit}
                />
            </CardLayout>
        </>    
    )
}

export default Playlist;