"use client"
import { Box, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../../../theme/Theme'

const AdvBox = () => {
  return (
    <>
        <Box sx={{height: 200, textAlign: 'center', mt: 1, py: 2, color: theme.palette.primary.main}}>
            <Typography variant="h1" gutterBottom sx={{fontSize: 30, fontWeight: 700, fontFamily: '-moz-initial' }}>
                Find Your Life In World
            </Typography>
            <Typography variant="h2" gutterBottom sx={{fontSize: 20}}>
                Feel free your life
            </Typography>

            <Box sx={{width: '100%', mt: 3, height: 100}}>
                <img src='/blog2.jpg' width={'100%'} height={220} />
            </Box>
        </Box>
    </>
  )
}

export default AdvBox