import Modal from "../Modal";

const AlertDialog = ({title, conteudo, openModal, icon, iconColor, onClose}:any) => {
    return (
        <>
            <Modal>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex-col flex items-center justify-center">
                    <div className="text-center rounded-full bg-red-100 sm:h-16 sm:w-16 flex justify-center items-center">
                        <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                        <h3 className="mt-4 sm:text-sm lg:text-lg font-semibold leading-6 text-gray-900" id="modal-title ">Deactivate account</h3>
                        <div className="mt-2">
                            <p className="sm:text-left sm:text-sm lg:text-lg text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 sm:text-sm lg:text-lg font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 sm:text-sm lg:text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default AlertDialog;