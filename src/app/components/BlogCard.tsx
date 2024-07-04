import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../../theme/Theme'
import Link from 'next/link'
import { CalendarMonth } from '@mui/icons-material'

const BlogCard = () => {
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/travel-blog.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Link href='/blogs/detail/5'>
                        <Typography textAlign='left' sx={{ color: theme.palette.primary.main, fontWeight: 500 }} gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: 12, color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>
                            <CalendarMonth sx={{ fontSize: 13, mb: 0.5, mr: 0.5 }} /> Published at:<span className='blog-subtitle'> 2024-07-4 </span>
                        </Typography>
                        <Typography variant="body2" textAlign='left' color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </Link>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default BlogCard