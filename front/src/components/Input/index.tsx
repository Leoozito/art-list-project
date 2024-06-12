import { useEffect } from "react";

const Input = ({value, label, type, name, error, ...rest }:any ) => {

    return(
        <>
            <div className="flex-col w-full">
                <label 
                    className="flex items-initial py-1 text-lg font-medium leading-6 text-gray-900 mb-1"
                >
                        {label}
                </label>
                <input
                    {...rest}
                    value={value}
                    type={type}
                    name={name}
                    className={`w-full rounded-md border-0 py-4 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-lg sm:leading-6`}
                />
                {error && (<span className="p-1 text-red-600 text-md">{error}</span>)}
            </div>
        </>
    )
}

export default Input;