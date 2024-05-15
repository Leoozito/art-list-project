
const Input = ({ label, type, name, className, error, ...props }:any ) => {


    return(
        <>
            <div className="flex-col w-full">
                <label 
                    className="py-1 block text-lg font-medium leading-6 text-gray-900 mb-1"
                >
                        {label}
                </label>
                <input
                    {...props}
                    type={type}
                    name={name}
                    className={`w-full rounded-md border-0 py-4 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-lg sm:leading-6`}
                />
            </div>
        </>
    )
}

export default Input;