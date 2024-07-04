"use client"

import Link from 'next/link'
import { ELLIPSIS_LEFT, ELLIPSIS_RIGHT, usePagination } from './usePagination'
import { usePathname, useSearchParams } from 'next/navigation'

type PaginationProps = { page: number, limit: number, total: number }

const Pagination = ({ page, limit, total }: PaginationProps) => {
    
    const { pages, isCurrentPage } = usePagination({page, limit, total})

    const pathName = usePathname()
    const searchParams = useSearchParams()

    const generateUrl = (page:number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page?.toString());

        const url = `${pathName}?${params?.toString()}`
        return url
    }

    const className = "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="mt-4 inline-flex -space-x-px text-base h-10">
                    {pages.map((page, index) => {

                        const isEllipsis = page == ELLIPSIS_LEFT || page == ELLIPSIS_RIGHT;

                        const isFirst = index == 0; 
                        const isLast = index + 1 == pages.length;
                        
                        const isCurrent = isCurrentPage(page)

                        {isEllipsis &&(
                            <li
                                key={page}
                            >
                                <span className={className}> ... </span>
                            </li>
                        )}

                        return(
                            <li
                                key={page}
                            >
                                <Link 
                                    href={generateUrl(page)} 
                                    className={className}
                                >
                                    {page}
                                </Link>
                            </li>
                        )
                    })}    
                </ul>
            </nav>
        </>
    )
}

export default Pagination