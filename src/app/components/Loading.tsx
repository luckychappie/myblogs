import { Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material'
import React from 'react'
import { theme } from '../../../theme/Theme';
import { grey } from '@mui/material/colors';

interface Props {
    count: number
}

export default function Loading(props: Props) {

    const renderLoading = () => {
        const loadingItems = [];
        for (let i = 0; i < props.count; i++) {
            loadingItems.push(
                <ListItem key={i} button sx={{ bgcolor: grey[200], mt: 0.5, py: 2 }} className="book-list-item">
                    <ListItemAvatar>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText sx={{ px: 2 }}>

                        <Skeleton animation="wave" height={10} width="40%" />

                        <Skeleton animation="wave" height={10} width="60%" />
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                        />

                    </ListItemText>
                </ListItem>
            );
        }
        return loadingItems;
    };

    return (
        <div>
            <List sx={{ width: '100%' }}>
                { renderLoading() }
            </List>
        </div>
    )
}
