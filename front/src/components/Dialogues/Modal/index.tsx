import { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const Modal = ({openModal, children, onClose}:any) => {

    const [modal, setModal] = useState(openModal);

    useEffect(() => {
        if (openModal) {
            setModal(openModal)
        }
    },[openModal])

    const closeModal = () => {
        setModal(false);
        if (onClose) {
            onClose();
        }
    };

    return(
        <>
            {modal && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-1 text-center sm:items-center sm:p-0">                    
                            <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl p-4">
                                <div 
                                    onClick={closeModal}
                                    className="justify-end flex items-end cursor-pointer "
                                >
                                    <RiCloseCircleLine 
                                        className="text-3xl"
                                    />
                                </div>
                                <div className="mt-6 mb-4">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal;