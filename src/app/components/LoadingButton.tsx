import { Button, CircularProgress } from '@mui/material'
import React from 'react'


interface Props {
    btnText: string
    isLoading: boolean
}

const LoadingButton = (props: Props) => {

    const loadingButton = () => {
        if (props.isLoading === false) {
         return (<Button type='submit' variant="contained" sx={{ mt: 5, px: 3 }}> {props.btnText} </Button>)
        }else{
            return (<Button variant="contained" sx={{ mt: 5, px: 3 }} disabled> 
                {props.btnText} <CircularProgress color="inherit" size={14} sx={{ml: 1}} />  
            </Button>)
        }
    }



  return (
    loadingButton()
    
  )
}

export default LoadingButton