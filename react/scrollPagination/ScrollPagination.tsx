import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'

import './style.css'

interface PhotosData {
    id: number;
    title: string;
    thumbnailUrl: string;
}

const ScrollPagination: FC = () => {
    const [photos, setPhotos] = useState<PhotosData[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [fetching, setFetching] = useState<boolean>(true)
    const [totalCount, setTotalCount] = useState<number>(0)

    useEffect(() => {
        if (fetching) {
            axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
                .then(response => {
                    setPhotos([...photos, ...response.data])
                    setCurrentPage(prevState => prevState + 1)
                    setTotalCount(+response.headers['x-total-count'])
                })
                .finally(() => setFetching(false))
        }
    }, [fetching])

    useEffect(() => {
        const scrollHandler: EventListener = (e: Event) => {
            const target = e.target as Document
            const totalScrollHeight = target.documentElement.scrollHeight
            const scrollingPosition = target.documentElement.scrollTop
            const windowHeight = window.innerHeight

            if ((totalScrollHeight - (scrollingPosition + windowHeight) < 100) && (photos.length < totalCount)) {
                setFetching(true)
            }
        }

        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [totalCount, photos])

    return (
        <section className='container'>
            <div className="content__scroll">
            {
                photos.map(photo =>
                    <div key={photo.id} className="photo-item">
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <h3>{photo.id}. {photo.title}</h3>
                    </div>
                )
            }
            </div>
        </section>
    )
}

export default ScrollPagination