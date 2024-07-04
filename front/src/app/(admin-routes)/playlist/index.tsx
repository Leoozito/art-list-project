"use client"

// services
import { getAllAlbumsService, getAlbumByIdService, deleteAlbumService } from "@/data/services/album-services/playlist-service"
import { useEffect, useState } from "react";
// components
import FormPlaylist from "@/components/Forms/FormPlaylist";
import AlbumCard from "@/components/Card/AlbumCard";
import CardLayout from "@/components/Card/CardLayout";
import AlertDialog from "@/components/Dialogues/AlertDialog";
import Pagination from '@/components/Pagination'
import CardCreateAlbum from "@/components/Card/CardCreateAlbum";
import CircularProgress from "@/components/CircularProgress";

type PageProps = {
	searchParams?: {page?:string, limit?:string}
}    

type UserProps = {
    datasUser: {
        userId: number | undefined;
        userRole: string | undefined;
    }
}

const Playlist = ({datasUser}: UserProps, {searchParams}:PageProps) => {
    const [allAlbums, setAllAlbums] = useState<any>()

    const [albumEditData, setAlbumEditData] = useState({
        idAlbum: 0,
        artist: '',
        nameAlbum: '',
        yearAlbum: ''
    });
    const [edit, setEdit] = useState<boolean>(false)
    
    const page = Number(searchParams?.page) || 1;
    const limit = Number(searchParams?.limit) || 10;
    const [metadata, setMetadata] = useState<number>(0)
    
    const [openCardCreateAlbum, setOpenCardCreateAlbum] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [alertContent, setAlertContent] = useState({
        title: '',
        description: ''
    })
    const [errorDialog, setErrorDialog] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        const fetchAlbums = async () => {
            const datasAlbums = await getAllAlbumsService(page, limit, datasUser.userId);
            setAllAlbums(datasAlbums?.albums);
            setMetadata(datasAlbums?.metadata?.total_count)
            setLoading(false)
        };

        fetchAlbums()      
    }, [datasUser])

    const editAlbumById = async (id:number) => {
        setEdit(true)
        try {
            const datasToEdit = await getAlbumByIdService(id);
            setAlbumEditData({
                idAlbum: id,
                artist: datasToEdit?.artists,
                nameAlbum: datasToEdit?.name_album,
                yearAlbum: datasToEdit?.year_album
            });
            setOpenCardCreateAlbum(!openCardCreateAlbum)
        } catch (error:any) {
            setAlertContent({
                title: `Error when querying album data, ID: ${id}`,
                description: `${error}`
            });
            setErrorDialog(true)
        }
    }

    return(
        <>
            {loading && (
                <CircularProgress/>
            )}
            <AlertDialog
                content={alertContent}
                error={errorDialog}
            />
            <CardLayout>
                <CardCreateAlbum 
                    onClick={() => setOpenCardCreateAlbum(!openCardCreateAlbum)}
                />                                
                <div className="mt-14 px-10 gap-12 grid md:grid-cols-2 2xl:grid-cols-3">
                    {allAlbums && (
                        <>
                            {allAlbums.map((album:any) => 
                                <>
                                    <AlbumCard
                                        key={album.id}
                                        onEditClick={() => editAlbumById(album.id)}
                                        albumDatas={album}                            
                                    />
                                </>
                            )}
                            <div className="col-span-3 justify-center flex">
                                <Pagination
                                    page={page}
                                    limit={limit}
                                    total={metadata}
                                />
                            </div>
                        </>
                    )}
                </div>
                <FormPlaylist
                    userId={datasUser.userId}
                    editAlbum={edit}
                    albumEditDatas={albumEditData}
                    openCard={openCardCreateAlbum}
                    onClose={() => setOpenCardCreateAlbum(false)}
                />
            </CardLayout>
        </>    
    )
}

export default Playlist;