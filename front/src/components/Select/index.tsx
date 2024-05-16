const Select = ({props}:any) => {
    return(
        <>
                <label>{props.label}</label>
                <select
                    {...props}
                    value={props.value}
                    required={props.required}
                >
                    {props.items.map((items:any) => 
                        <option 
                            key={items}
                        >
                            {items}
                        </option>
                    )}
                </select>
        </>
    )
}

export default Select;