"use client"
import { Box, Container, Typography } from "@mui/material";
import { theme } from "../../../theme/Theme";
import { grey } from "@mui/material/colors";


import React from 'react'

const Contact = () => {
    return (
        <Box sx={{ mt: 0 }}>
            <div>
                <title>Contact Us</title>
            </div>
            <Typography variant="h4" gutterBottom className="title" sx={{ pt: 4, fontSize: 25, fontWeight: 600, color: theme.palette.primary.main, fontFamily: 'series', textAlign: 'center', letterSpacing: 3 }}>
                Contact Us
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: grey[600], fontFamily: '-moz-initial', textAlign: 'center' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit provident   adipisci est<br /> error assumenda repudiandae
            </Typography>
            <Container sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
                <Typography sx={{ fontSize: 20, color: theme.palette.primary.main }}> Comming Soon... </Typography>
            </Container>
        </Box>
    );
}

export default Contact