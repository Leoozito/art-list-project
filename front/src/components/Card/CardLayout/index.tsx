const CardLayout = ({children}:any) => {
    return(
        <>
            <div 
                className="bg-white border border-gray-200 rounded-md shadow  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 col-span-1"
            >
                {children}
            </div>
        </>
    )
}

export default CardLayout;