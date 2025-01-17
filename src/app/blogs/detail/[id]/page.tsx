"use client"
import { Blog, Comment } from '@/app/types/blog'
import createAxios from '@/lib/axios'
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { theme } from '../../../../../theme/Theme'
import DOMPurify from 'dompurify'
import { CalendarMonth, Send } from '@mui/icons-material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { formatDate, formatDateTime } from '@/app/utils/filter'
import LoadingPost from '@/app/components/LoadingPost'
import { useAuth } from '@/context/AuthContext'
import CommentForm from '@/app/components/CommentForm'
import Footer from '@/app/components/Footer'
import Person3Icon from '@mui/icons-material/Person3';
import FaceIcon from '@mui/icons-material/Face';

const page = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [blog, setBlog] = useState<Blog | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const { user } = useAuth()

    const getComments = async () => {

        await setIsLoading(true)

        await createAxios.get(`/comments/${id}`)
            .then((res) => {
                if (!res.data) throw new Error('Network response was not ok');
                return res.data
            })
            .then((data: { comments: Comment[] }) => {
                setComments(data.comments)
                
            }).catch((error: Error) => {
                setIsLoading(false)
                throw new Error('Network response was not ok')
            })
            .finally(() => setIsLoading(false));
    }

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
    }

    const createMarkup = (html: string) => {
        return { __html: DOMPurify.sanitize(html) };
    };

    useEffect(() => {
        getBlog()
        getComments()
    }, [id])

    return (
        <div>
             <div>
                <title>{blog?.title}</title>
                <meta name="description" content={blog?.content.slice(0, 120) } />
                <meta name="keywords" content={`${blog?.title}, find travel tips,  hiking, diving, `} />
              </div>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                {
                    isLoading ? (
                        <LoadingPost />
                    ) : (
                    
                    <Box width='65%'>
                        <Box>
                            <img src='/blog5.jpg' width='100%' />
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
                                    <PermIdentityIcon sx={{ fontSize: 19, mb: 0.5, mr: 0.5 }} /> 
                                    {/* Blogger: <span className='blog-subtitle'>{blog?.author?.name} </span> */}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <div dangerouslySetInnerHTML={createMarkup(blog?.content ?? '')} />
                        </Box>
                        <Divider sx={{my: 3}} />
                        <Box sx={{pb: 3}}>
                            <Box>
                                <Typography variant="subtitle1" sx={{fontSixe: 20, fontWeight: 600}}>
                                    Comments:
                                </Typography>
                                <Box sx={{ml:2}}>
                                    {
                                        comments.map((comment) => (
                                            <Box key={comment.id} sx={{mt:3}}>
                                                <Box sx={{fontSixe: 15., display: 'flex', alignItems: 'center',}}>
                                                    
                                                    <FaceIcon sx={{fontSize: 16, mr:0.5 }} />  
                                                    <Typography sx={{fontWeight: 700, color: theme.palette.primary.main}}> {comment.user.name}</Typography>
                                                   
                                                    <Typography sx={{ fontSize: 11, color: theme.palette.info.main, ml:2 }}>{formatDateTime(comment.created_at)}</Typography>
                                                </Box>
                                        
                                                <Typography sx={{ml:2}}>
                                                    {comment.message}
                                                </Typography>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>
                            <Typography variant="h5" sx={{ my: 1, fontSize: 15, fontWeight: 700, mt: 2 }}>
                                Leave your comment
                                
                            </Typography>
                                
                                {
                                    user && (
                                        <Typography variant="subtitle2" sx={{ fontSize: 15, mt: 1, display: 'flex', alignItems: 'center'}}>
                                            <PermIdentityIcon sx={{ fontSize: 23, mr: 0.5, color: theme.palette.primary.main }} /> 
                                           {user.name}
                                        </Typography>
                                    )
                                }
                               <CommentForm setComments={setComments} blog_id={blog?.id} />
                        </Box>
                    </Box>
                        
                    )
                }
            </Container>
            <Footer />
        </div>
    )
}

export default page