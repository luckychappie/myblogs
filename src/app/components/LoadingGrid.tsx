import { Card, CardActionArea, CardContent, Grid,Skeleton } from '@mui/material'
import React from 'react'

interface Props {
    count: number
    column: number
}

export default function LoadingGrid(props: Props) {
    const renderLoading = () => {
        const loadingItems = [];
        for (let i = 0; i < props.count; i++) {
            loadingItems.push(
                <Grid key={i} item md={props.column} xs={12} sx={{ display: 'flex', alignItems: 'ccenter' }} >
                    <Card sx={{ px: 2, pb: 2, width: '100%' }}>
                        <Skeleton sx={{py:0, my:0}} animation="wave" height={140} width="100%" />
                        <Skeleton animation="wave" height={10} width="50%" />
                        <Skeleton animation="wave" height={15} width="80%" />
                        <Skeleton animation="wave" height={15} width="100%" />
                    </Card>
                </Grid>
            );
        }
        return loadingItems;
    };

    return (
        <div>
            <Grid container spacing={3}>
                {renderLoading()}
            </Grid>
        </div>
    )
}
