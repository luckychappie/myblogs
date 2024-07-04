import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../../theme/Theme'
import { grey } from '@mui/material/colors'

const BlogCardRow = () => {
    return (
        <Card sx={{ maxWidth: '100%', mt:0.5, bgcolor: grey[200] }} elevation={0}>
            <CardActionArea>
                <CardContent>
                    <Grid container spacing={3} sx={{alignItems: 'center'}}>
                        <Grid item xs={4}>
                            <img src='/traveller.jpg' width='100%' />
                        </Grid>
                        <Grid item xs={8} sx={{textAlign: 'left'}}>
                            <Typography sx={{ color: theme.palette.primary.main, fontWeight: 500 }} gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                            </Typography>
                        </Grid>
                    </Grid>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default BlogCardRow