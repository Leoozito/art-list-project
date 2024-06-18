import CardLayout from "../CardLayout";
import { PiMusicNotesFill } from "react-icons/pi";
import { MdOutlineDeleteForever } from "react-icons/md";

interface AlbumDatas {
    artist: string,
    name_album: string,
    year_album: string 
}

interface AlbumCardProps {
    albumDatas: AlbumDatas;
    key: string | number;
    onClick: () => void;
    isAdm: boolean;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ albumDatas }, {key, onClick, isAdm}:any) => {

    return(
        <>
            <CardLayout
                key={key}
                onClick={onClick} 
                style={{ cursor: 'pointer' }}
            >
                <div className="p-2 flex items-center">
                    <div className="flex-col sm:justify-center items-center leading-normal overflow-hidden ">
                        <div className="items-center flex">
                            <p className="mb-4 text-lg font-bold tracking-tight text-orange-600 dark:text-white capitalize flex break-words max-w-sm">Album name: {albumDatas.name_album}</p>
                        </div>
                        <div className="items-center flex overflow-hidden">
                            <div className="flex-1 items-center flex">
                                <PiMusicNotesFill className="text-orange-700 text-center font-extrabold text-6xl" size={48}/>
                            </div>

                            <div className="flex-1 flex items-center">
                                <div className="text-gray-700 break-words max-w-sm text-lg flex items-center">
                                    <p className="font-bold mr-2">Artist:</p>
                                    <p>{albumDatas.artist}</p>
                                </div>
                                
                                <div className="text-gray-700 break-words max-w-sm text-lg flex items-center">
                                    <p className="font-bold mr-2"> Year of release: </p>
                                    <p className="">{albumDatas.year_album}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isAdm && (
                        <MdOutlineDeleteForever 
                            className="text-3xl text-red-700 text-center font-extrabold mr-8"
                        />
                    )}
                </div>
            </CardLayout>
        </>
    )
}

export default AlbumCard;