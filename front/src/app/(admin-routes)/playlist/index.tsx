"use client"

// services
import { getAllAlbumsService, getAlbumByIdService, deleteAlbumService } from "@/data/services/album-services/playlist-service"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// components
import FormPlaylist from "@/components/Forms/FormPlaylist";
import AlbumCard from "@/components/Card/AlbumCard";
import CardLayout from "@/components/Card/CardLayout";
import AlertDialog from "@/components/Dialogues/AlertDialog";
import Pagination from '@/components/Pagination'
import CardCreateAlbum from "@/components/Card/CardCreateAlbum";
// Icons
import { LuAlertTriangle } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegRectangleXmark } from "react-icons/fa6";

type PageProps = {
	searchParams?: {page?:string, limit?:string}
}    

const Playlist = ({searchParams}:PageProps) => {
    const { data: session, status } = useSession()
    const [allAlbums, setAllAlbums] = useState<any>()
    const [typeRole, setTypeRole] = useState<any>()

    const [albumEditData, setalbumEditData] = useState({
        artists: '',
        nameAlbum: '',
        yearAlbum: ''
    });
    const [edit, setEdit] = useState<boolean>(false)
    
    const page = Number(searchParams?.page) || 1;
    const limit = Number(searchParams?.limit) || 10;
    
    const [openCardCreateAlbum, setOpenCardCreateAlbum] = useState<boolean>(false)

    // const [modalSucess, setModalSucess] = useState(false);
    // const [modalError, setModalError] = useState(false);
    // const [modalAlert, setModalAlert] = useState(false);
    // const [modalConteudo, setModalConteudo] = useState("")

    // const closeModal = () => {
    //     setModalSucess(false)
    //     setModalError(false)
    //     setModalAlert(false)
    // }

    const typeUser = async (session:any) => {
        if (session) {
            setTypeRole(JSON.stringify(session?.user?.role))
        }
    }

    useEffect(() => {
        if (session !== null && session !== undefined) {
            typeUser(session)

            const fetchAlbums = async () => {
                const datasAlbums = await getAllAlbumsService(page, limit, session);
                setAllAlbums(datasAlbums?.albums);
            };

            fetchAlbums()
        }
    }, [session])

    useEffect(() => {
        setOpenCardCreateAlbum(false)
    }, [openCardCreateAlbum])

    // const getAlbumById = async (id:number) => {
    //     try {
    //         const data = await getAlbumByIdService(id);

    //         // setArtist(data.artist)
    //         // setNameAlbum(data.name_album)
    //         // setYearAlbum(data.year_album)
    //     } catch (error:any) {
    //         console.error(`Error when querying album data, ID: ${id}`,error);
    //     }
    // }
    
    if (status === "loading") {
        return <div>Loading...</div>
    }

    return(
        <>
            {/* {!modalSucess && (
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
            )} */}
            {(session !== null && session !== undefined) && (
                <CardLayout>
                    <CardCreateAlbum 
                        onClick={() => setOpenCardCreateAlbum  (!openCardCreateAlbum)}
                    />                                
                    <div className="mt-14 gap-12 grid sm:grid-cols-2 lg:grid-cols-3">
                        {allAlbums && allAlbums.map((album:any) => 
                            {
                                console.log(album)
                                return(<AlbumCard
                                isAdm={typeRole}
                                key={album.id}
                                onDelete={() => deleteAlbumService(album.id)}
                                // onClick={getAlbumById(album.id)}
                                artist={album.artist}
                                name_album={album.name_album}
                                year_album={album.year_album}                            />)}
                        )}
                    </div>
                    <Pagination
                        page={page}
                        limit={limit}
                        total={2} // metadata.pagination.total
                    />
                    <FormPlaylist
                        albumEditDatas={albumEditData}
                        openCard={openCardCreateAlbum}
                        editAlbum={edit}
                    />
                </CardLayout>
            )}
        </>    
    )
}

export default Playlist;