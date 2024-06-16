import Modal from "../Modal";
import { LuAlertTriangle } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";

const AlertDialog = ({children, content, alert, sucess, error}:any) => {
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
        {openModal && (      
            <div className="relative z-50">
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
                    {children}
                </Modal>
            </div>
        )}
        </>
    )
}

export default AlertDialog;