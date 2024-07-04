import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../../theme/Theme'
import Link from 'next/link'

const BlogCard = () => {
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardActionArea href='/blogs/1'>
                <CardMedia
                    component="img"
                    height="140"
                    image="/travel-blog.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography sx={{color: theme.palette.primary.main, fontWeight: 500}} gutterBottom variant="h5" component="div">
                        Lizard 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default BlogCard