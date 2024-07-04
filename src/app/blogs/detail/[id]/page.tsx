"use client"
import { Blog } from '@/app/types/blog'
import createAxios from '@/lib/axios'
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { theme } from '../../../../../theme/Theme'
import DOMPurify from 'dompurify'
import { CalendarMonth, Send } from '@mui/icons-material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { formatDate } from '@/app/utils/filter'

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

    const createMarkup = (html: string) => {
        return { __html: DOMPurify.sanitize(html) };
    };

    const handleInput = (e: any) => {
        e.preventDefault();

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()


    }

    useEffect(() => {
        getBlog()
    }, [id])

    return (
        <div>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <Box width='65%'>
                    <Box>
                        <img src='/blog4.jpg' width='100%' />
                    </Box>
                    <Box>
                        <Typography variant="h1" sx={{ my: 1, fontSize: 20, fontWeight: 700 }}>
                            {blog?.title}
                        </Typography>
                        <Box sx={{ mt: 1, fontSize: 15, display: 'flex', alignItems: 'center', color: theme.palette.primary.main }}>
                            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarMonth sx={{ fontSize: 15, mb: 0.5, mr: 0.5 }} /> Published at:<span className='blog-subtitle'> {formatDate(blog?.created_at)} </span>
                            </Typography>
                            <Typography sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                                <PermIdentityIcon sx={{ fontSize: 19, mb: 0.5, mr: 0.5 }} /> Blogger: <span className='blog-subtitle'>{blog?.author?.name} </span>
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <div dangerouslySetInnerHTML={createMarkup(blog?.content ?? '')} />
                    </Box>
                    <Divider sx={{my: 3}} />
                    <Box>
                        <Typography variant="h5" sx={{ my: 1, fontSize: 15, fontWeight: 700 }}>
                            Leave your comment
                            
                        </Typography>
                            <form onSubmit={handleSubmit} >
                            <Typography variant="subtitle2" sx={{ fontSize: 15, my: 1, display: 'flex', alignItems: 'center'}}>
                                <PermIdentityIcon sx={{ fontSize: 23, mr: 0.5, color: theme.palette.primary.main }} /> 
                                Your name
                                </Typography>
                                <Grid container spacing={2} sx={{ alignItems: 'center', mt: 1 }}>
                                    <Grid item xs={10}>
                                        Message :
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            multiline
                                            minRows={5}
                                            name='message'
                                            onChange={handleInput}
                                            fullWidth
                                            id="outlined-basic"
                                            variant="outlined" />
                                    </Grid>
                                </Grid>
                                <Button sx={{ mt: 2 }} endIcon={<Send />} variant="contained">Send</Button>

                            </form>
                    </Box>
                </Box>
            </Container>

        </div>
    )
}

export default page