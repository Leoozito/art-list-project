import Modal from "../Modal";
import { LuAlertTriangle } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";

const AlertDialog = ({content, alert, sucess, error}:any) => {
    const [openModal, setOpenModal] = useState()

    useEffect(() => {
        if (sucess) {
            setOpenModal(sucess)
        } else if (error) {
            setOpenModal(error)            
        } else {
            setOpenModal(alert)
        }
    }, [sucess, alert, error])

    return (
        <>
            <Modal openModal={openModal}>
                <div className="flex-col flex items-center justify-center">
                    <div className={`text-center rounded-full flex justify-center items-center`}>
                        {sucess &&(
                            <><FaRegCircleCheck className="text-5xl text-[#16a34a]"/></>
                        )}
                        {alert &&(
                            <><LuAlertTriangle className="text-5xl text-[#facc15]"/></>
                        )}
                        {error &&(
                            <><FaRegRectangleXmark className="text-5xl text-[#ef4444]"/></>
                        )}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                        <h3 className="mt-4 sm:text-sm lg:text-lg font-semibold leading-6 text-gray-900" id="modal-title ">{content.title}</h3>
                        <div className="mt-2">
                            <p className="sm:text-left sm:text-sm lg:text-lg text-gray-500">{content.description}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className={`inline-flex w-full justify-center rounded-md ${sucess && "bg-[#16a34a] hover:bg-green-400"} ${alert && "bg-[#facc15] hover:bg-yellow-400"} ${error && "bg-[#ef4444] hover:bg-red-400"} px-3 py-2 sm:text-sm lg:text-lg font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}>Deactivate</button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 sm:text-sm lg:text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default AlertDialog;