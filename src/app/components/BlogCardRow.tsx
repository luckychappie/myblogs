import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../../theme/Theme'
import { grey } from '@mui/material/colors'
import { Blog } from '../types/blog'
import { CalendarMonth } from '@mui/icons-material'
import { formatDate, getImageUrl } from '../utils/filter'

interface Props {
    blog: Blog
}

const BlogCardRow = (props: Props) => {
    return (
        <Card sx={{ maxWidth: '100%', mt:0.5, bgcolor: grey[200] }} elevation={0}>
            <CardActionArea>
                <CardContent sx={{p:1}}>
                    <Grid container spacing={3} sx={{alignItems: 'center'}}>
                        <Grid item xs={4}>
                            <img src={`/${getImageUrl(props.blog.thumbnail)}`} width='70%' />
                        </Grid>
                        <Grid item xs={8} sx={{textAlign: 'left'}}>
                            <Typography sx={{ fontSize: 15, color: theme.palette.primary.main, fontWeight: 500 }} gutterBottom variant="h5" component="div">
                                {props.blog.title}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: 12, color: theme.palette.primary.main, display: 'flex', alignItems: 'center' }}>
                                <CalendarMonth sx={{ fontSize: 13, mb: 0.5, mr: 0.5 }} /> Published at:<span className='blog-subtitle'> {formatDate(props.blog.created_at)} </span>
                            </Typography>
                        </Grid>
                    </Grid>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default BlogCardRow