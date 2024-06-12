const Select = (props:any) => {
    return(
        <>
            <div className="flex-col w-full">
                <label
                    className="flex items-initial py-1 text-lg font-medium leading-6 text-gray-900 mb-1"
                >
                    {props.label}
                </label>
                <select
                    {...props}
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    required={props.required}
                    className="w-full rounded-md border-0 py-4 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-sm sm:text-lg sm:leading-6"
                >
                    {props.items && props.items.map((items:any) =>
                        <option
                            key={items}
                        >
                            {items}
                        </option>
                    )}
                </select>
            </div>
        </>
    )
}

export default Select;