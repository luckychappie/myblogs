import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../../theme/Theme'
import Link from 'next/link'
import { CalendarMonth } from '@mui/icons-material'
import { Blog } from '../types/blog'
import { formatDate } from '../utils/filter'


interface Props {
    blog: Blog
}

const BlogCard = (props: Props) => {
    return (
        <Card sx={{ maxWidth: '100%',  height: '100%'}}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    height="140"
                    image="/travel-blog.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography textAlign='left' sx={{ color: theme.palette.primary.main, fontWeight: 500 }} gutterBottom variant="h5" component="div">
                        {props.blog.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: 12, color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>
                        <CalendarMonth sx={{ fontSize: 13, mb: 0.5, mr: 0.5 }} /> Published at:<span className='blog-subtitle'> {formatDate(props.blog.created_at)} </span>
                    </Typography>
                    <Typography variant="body2" textAlign='left' color="text.secondary">
                        {props.blog.content.slice(0, 120) + '...'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default BlogCard