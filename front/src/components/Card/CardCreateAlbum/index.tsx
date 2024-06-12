import { PiMusicNotesPlusFill } from "react-icons/pi";

const CardCreateAlbum = ({onClick}:any) => {
    return(
        <>
            <div
                onClick={onClick}
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
        </>
    )
}

export default CardCreateAlbum;