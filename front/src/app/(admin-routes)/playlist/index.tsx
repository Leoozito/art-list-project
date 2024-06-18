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

type PageProps = {
	searchParams?: {page?:string, limit?:string}
}    

const Playlist = ({searchParams}:PageProps) => {
    const { data: session, status } = useSession()
    const [allAlbums, setAllAlbums] = useState<any>()
    const [typeRole, setTypeRole] = useState<any>()

    const [albumEditData, setalbumEditData] = useState({
        artist: '',
        nameAlbum: '',
        yearAlbum: ''
    });
    const [edit, setEdit] = useState<boolean>(false)
    
    const page = Number(searchParams?.page) || 1;
    const limit = Number(searchParams?.limit) || 10;
    
    const [openCardCreateAlbum, setOpenCardCreateAlbum] = useState<boolean>(false)
    const [alertContent, setAlertContent] = useState({
        title: '',
        description: ''
    })
    const [errorDialog, setErrorDialog] = useState<boolean>(false)

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

    const getAlbumById = async (id:number) => {
        try {
            const data = await getAlbumByIdService(id);

            // console.log(data)
        } catch (error:any) {
            setAlertContent({
                title: `Error when querying album data, ID: ${id}`,
                description: `${error}`
            });
            setErrorDialog(true)
        }
    }
    
    if (status === "loading") {
        return <div>Loading...</div>
    }

    return(
        <>
            <AlertDialog
                content={alertContent}
                error={errorDialog}
            />
            <CardLayout>
                <CardCreateAlbum 
                    onClick={() => setOpenCardCreateAlbum  (!openCardCreateAlbum)}
                />                                
                <div className="mt-14 px-10 gap-12 grid sm:grid-cols-2 lg:grid-cols-3">
                    {allAlbums && allAlbums.map((album:any) => 
                        <AlbumCard
                            isAdm={typeRole}
                            key={album.id}
                            // onDelete={() => deleteAlbumService(album.id)}
                            onClick={() => getAlbumById(album.id)}
                            albumDatas={album}                            
                        />
                    )}
                </div>
                <Pagination
                    page={page}
                    limit={limit}
                    total={2} // metadata.pagination.total
                />
                {openCardCreateAlbum && (
                    <FormPlaylist
                        albumEditDatas={albumEditData}
                        openCard={openCardCreateAlbum}
                        editAlbum={edit}
                    />
                )}
            </CardLayout>
        </>    
    )
}

export default Playlist;