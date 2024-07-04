import { BubbleChart } from '@mui/icons-material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Box, Divider, Drawer, ImageList, ImageListItem, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react'

import Link from 'next/link';

interface Props {
    window?: () => Window
    mobileOpen: boolean
    sendSidebarStatus: Function
}

export default function Sidebar(props: Props) {

    const { window, mobileOpen, sendSidebarStatus } = props;

    const handleSidebar = () => {
        sendSidebarStatus(mobileOpen)
    }

    const container = window !== undefined ? () => window().document.body : undefined;
    const drawer = (
        <Box onClick={handleSidebar} >
            <Box sx={{ bgcolor: '#FFF' }}>
                <img alt='Korea Movies' src='/static/small-logo.png' className='sidebar-icon' />
            </Box>

            <Divider />
            <Box>
                {/* <List >
                    {navItems.map((item) => (
                        <ListItem disablePadding button component={Link} href={`${item.link}`} key={item.title}>
                            <ListItemButton >
                                <ListItemIcon sx={{ minWidth: 33 }}>
                                    <LocalLibraryIcon fontSize='small' color="secondary" />
                                </ListItemIcon>
                                <ListItemText sx={{}} primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}

            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <img src='/static/sharing-meaning.png' alt='Sharing is caring' width={'100%'} />
            <Typography />
            <Box borderRadius={1} sx={{ bgcolor: '#000000', px: 1, py: 0.5, m: 1 }}>
                {/* <ImageList sx={{ width: '100%' }} cols={3} variant="woven" gap={8}>
                    {bookAdvs.map((item) => (
                        <ImageListItem key={item.title}>
                            <img
                                srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList> */}
            </Box>
        </Box>
    );

    return (
        <nav>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleSidebar}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: '85%',
                        bgcolor: '#F8DBDF'
                    },
                }}
            >
                {drawer}
            </Drawer>
        </nav>
    )
}
