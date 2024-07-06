import { Box, Card, CardActionArea, CardContent, Container, Grid,Skeleton } from '@mui/material'
import React from 'react'


export default function LoadingPost() {

    return (
            <Box width={{md: '65%', xs: '100%'}}>
            
            <Card sx={{ px: 2, pb: 2, width: '100%' }}>
                <Skeleton sx={{py:0, my:0}} animation="wave" height={250} width="100%" />
                <Skeleton animation="wave" height={15} width="50%" />
                <Skeleton animation="wave" height={20} width="80%" />
                <Skeleton animation="wave" height={30} width="100%" />
                <Skeleton animation="wave" height={100} width="100%" />
                <Skeleton animation="wave" height={15} width="50%" />
                <Skeleton animation="wave" height={20} width="80%" />
                <Skeleton animation="wave" height={10} width="100%" />
                <Skeleton animation="wave" height={150} width="100%" />
            </Card>
            </Box>
    )
}
