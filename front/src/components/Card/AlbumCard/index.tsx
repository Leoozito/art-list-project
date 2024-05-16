import CardLayout from "../CardLayout";
import { PiMusicNotesFill } from "react-icons/pi";

const AlbumCard = ({onClick, artist, nameAlbum, yearAlbum}:any) => {
    return(
        <>
            <CardLayout
                onClick={onClick} 
                style={{ cursor: 'pointer' }}
            >
                <div className="px-8 flex flex-row items-center">
                    <PiMusicNotesFill className="text-6xl text-orange-700 text-center font-extrabold mr-8" />
                    <div className="flex flex-col justify-between p-4 leading-normal sm:text-lg">
                        <a className="mb-4 text-2xl font-bold tracking-tight text-orange-600 dark:text-white capitalize">Album name: {nameAlbum}</a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Artist: {artist}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Year of release: {yearAlbum}</p>
                    </div>
                </div>
            </CardLayout>
        </>
    )
}

export default AlbumCard;