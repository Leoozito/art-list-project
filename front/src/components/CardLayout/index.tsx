import { PiMusicNotesPlusFill } from "react-icons/pi";

const CardLayout = () => {
    return(
        <>
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-md shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-16 py-2">
                <PiMusicNotesPlusFill className="text-6xl text-orange-700 text-center font-extrabold mr-8"/>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <a className="mb-4 text-2xl font-bold tracking-tight text-orange-600 dark:text-white">Novo album de musica</a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Artista</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Ano de Lançamento</p>
                </div>
            </div>
        </>
    )
}

export default CardLayout;