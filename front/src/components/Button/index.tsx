const Button = ({text}:any ) => {
    return(
        <>
            <button 
            
                className="w-full rounded-md bg-orange-600 px-3 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
                {text}
            </button>
        </>
    )
}

export default Button;