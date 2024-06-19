import CardLayout from "../CardLayout";
import { PiMusicNotesFill } from "react-icons/pi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";

interface AlbumDatas {
    artist: string,
    name_album: string,
    year_album: string 
}

interface AlbumCardProps {
    albumDatas: AlbumDatas;
    key: string | number;
    onEditClick: any;
    isAdm: boolean;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ albumDatas, key, onEditClick, isAdm }) => {

    console.log("OLAAAAA", onEditClick)

    return(
        <>
            <CardLayout
                key={key}
            >
                <div className="p-2 flex flex-col items-center">
                    <div className="sm:flex-col sm:justify-center items-center flex">
                        <p className="mb-4 text-lg font-bold tracking-tight text-orange-600 dark:text-white capitalize flex break-words max-w-sm">Album name: {albumDatas.name_album}</p>
                    </div>
                    <div className="items-center flex xl:flex-row sm:flex-col overflow-hidden sm:justify-center gap-12">
                        <div className="items-center flex">
                            <PiMusicNotesFill className="text-orange-700 text-center font-extrabold text-5xl"/>
                        </div>
                        <div className="flex-col items-center">
                            <div className="text-gray-700 break-words max-w-sm text-lg flex items-center space-x-2">
                                <p className="font-bold">Artist:</p>
                                <p>{albumDatas.artist}</p>
                            </div>
            
                            <div className="text-gray-700 break-words max-w-sm text-lg flex items-center space-x-2">
                                <p className="font-bold"> Year of release: </p>
                                <p className="">{albumDatas.year_album}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items-center mt-1 gap-8 flex justify-end">
                    {isAdm && (
                        <div className="bg-red-700/20 text-3xl rounded-full">
                            <MdOutlineDeleteForever
                                className="text-red-700 text-center font-extrabold cursor-pointer placeholder m-2"
                            />
                        </div>
                    )}
                    <div className="bg-indigo-700/20 rounded-full">
                        <FaPenToSquare
                            onClick={onEditClick}
                            className="text-indigo-700 text-2xl text-center font-extrabold cursor-pointer placeholder m-2"
                        />
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default AlbumCard;