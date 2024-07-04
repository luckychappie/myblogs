"use client"
import { Blog } from '@/app/types/blog'
import createAxios from '@/lib/axios'
import { Box, Container, Typography } from '@mui/material'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { theme } from '../../../../theme/Theme'

const page = () => {
    const param = useSearchParams()
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [blog, setBlog] = useState<Blog | null>(null)

    const getBlog = async () => {

        await setIsLoading(true)



        await createAxios.get(`/posts/${id}`)
            .then((res) => {
                if (!res.data) throw new Error('Network response was not ok');
                console.log(res.data.post)
                return res.data
            })
            .then((data: { post: Blog }) => {
                console.log('post = ', data.post)
                setBlog(data.post)

            }).catch((error: Error) => {
                setIsLoading(false)
                throw new Error('Network response was not ok')
            })
            .finally(() => setIsLoading(false));

        setIsLoading(false)
    }

    useEffect(() => {
        getBlog()
    }, [id])

    return (
        <div>
            <Container>
                <Box>
                    <img src='/blog4.jpg' width='100%' />
                </Box>
                <Box>
                    <Typography variant="h1" sx={{ my: 1, fontSize: 20, fontWeight: 700 }}>
                        {blog?.title}
                    </Typography>
                    <Box sx={{ mt: 1, fontSize: 15, display: 'flex', color: theme.palette.primary.main }}>
                        <Typography variant="subtitle1">
                            Published at:<span className='blog-subtitle'> {blog?.created_at} </span>
                        </Typography>
                        <Typography sx={{ ml: 2 }}>
                            Blogger: <span className='blog-subtitle'>{blog?.author?.name} </span>
                        </Typography>
                    </Box>
                </Box>
            </Container>

        </div>
    )
}

export default page