import CardLayout from "../CardLayout";
import { PiMusicNotesFill } from "react-icons/pi";
import { MdOutlineDeleteForever } from "react-icons/md";

interface AlbumDatas {
    artists: string,
    nameAlbum: string,
    yearAlbum: string 
}

const AlbumCard = ({isAdm, key, onClick,}:any, albumDatas:AlbumDatas) => {

    return(
        <>
            <CardLayout
                key={key}
                onClick={onClick} 
                style={{ cursor: 'pointer' }}
            >
                <div className="px-8 sm:py-4 lg:py-0 lg:flex lg:flex-row sm:justify-center sm:flex-col items-center">
                    <PiMusicNotesFill className="text-6xl text-orange-700 text-center font-extrabold mr-8" />
                    <div className="flex flex-col sm:justify-center lg:justify-between p-4 leading-normal sm:text-lg">
                        <a className="mb-4 text-2xl font-bold tracking-tight text-orange-600 dark:text-white capitalize">Album name: {albumDatas?.nameAlbum}</a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Artist: {albumDatas?.artists}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Year of release: {albumDatas?.yearAlbum}</p>
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