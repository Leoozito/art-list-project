import AlertDialog from "../AlertDialog";

const ConfirmAlertDialog = ({actionConfirm, actionCancel ,content, alert, sucess, error}:any) => {

    return(
        <>
            {(alert || sucess || error) && (
                <AlertDialog
                    content={content}
                    sucess={sucess}
                    alert={alert}
                    error={error}
                >
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button 
                            type="button" 
                            className={`inline-flex w-full justify-center rounded-md ${sucess && "bg-[#16a34a] hover:bg-green-400"} ${alert && "bg-[#facc15] hover:bg-yellow-400"} ${error && "bg-[#ef4444] hover:bg-red-400"} px-3 py-2 sm:text-sm lg:text-lg font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                            onClick={actionConfirm}
                        >
                            Send
                        </button>
                        <button 
                            type="button" 
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 sm:text-sm lg:text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={actionCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </AlertDialog>
            )}
        </>
    )
}

export default ConfirmAlertDialog;