"use client"
import { Box, Container, Divider, Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import { green, grey } from '@mui/material/colors'
import Link from 'next/link'
import React from 'react'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Grass from '@mui/icons-material/Grass'

const Footer = () => {
    const date = new Date()
    return (
        <Box sx={{ mt: 1, bgcolor: '#052500', color: '#fff' }}>
            <Container sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                        <Grass sx={{fontSize: 40, mr: 1, mb: 1}} /> Get In Touch with World
                        </Typography>
                        <Typography sx={{ mt: 2, color: grey[400] }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla sint adipisci deleniti fugiat culpa similique, necessitatibus error repellendus sed. fugiat culpa similique, necessitatibus error repellendus sed
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                            Useful Pages
                        </Typography>
                        <Divider sx={{width: 60, bgcolor: '#fff', mt: 0.6, mb: 1}} />
                        <List>
                            <ListItem disablePadding>
                                <ListItemText>
                                    <Link className='footer-link' href={'/'}>Our Blogs</Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText>
                                    <Link className='footer-link' href={'/'}>Contact us</Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemText>
                                    <Link className='footer-link' href={'/'}>About us</Link>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <Box sx={{display: 'flex'}}>
                            <IconButton aria-label="delete">
                                <GitHubIcon sx={{color: grey[400]}} />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <LinkedInIcon sx={{color: grey[400]}} />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <FacebookRoundedIcon sx={{color: grey[400]}} />
                            </IconButton>
                        </Box>

                    </Grid>
                </Grid>
            </Container>
            <Box sx={{textAlign: 'center' ,bgcolor: '#012103', p: 2, borderTop:'1px solid #042c04'}}>
                <Typography sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                    Created @ {date.getFullYear()} by Lucy <Grass sx={{fontSize: 25, ml: 1}} />
                </Typography>
            </Box>
        </Box>
    )
}

export default Footer