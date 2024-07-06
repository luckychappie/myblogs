import { useAuth } from '@/context/AuthContext'
import createAxios from '@/lib/axios'
import { Login, Send } from '@mui/icons-material'
import { Button, Grid, TextField } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'

interface Props {
    blog_id?: number
}

const CommentForm = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const {setShowSnackbar, setSnackbarMessage, user} = useAuth()

    const sendComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if(message !== ''){
            setErrorMessage('')
            await setIsLoading(true)
            try {
                await createAxios.post(`/comments/send`, {
                    message: message,
                    user_id: user?.id,
                    post_id: props.blog_id
                })
                .then((res) => {
                    setShowSnackbar(true)
                    setSnackbarMessage('Message was sent successfully')
                    setMessage('')
                })
                .catch((error: Error) => {
                    setShowSnackbar(true)
                    setSnackbarMessage('Server error. Please try again later')
                    throw new Error('Network response was not ok')
                })
                .finally(() => setIsLoading(false));
            }catch (error) {
                setIsLoading(false)
                setShowSnackbar(true)
                setSnackbarMessage('Server error. Please try again later')
            }
            
        } else {
            setErrorMessage('Please enter comment')
        }
        
    }


    return (
        <form onSubmit={sendComment}>
            <Grid container spacing={2} sx={{ alignItems: 'center', mt: 1 }}>
                <Grid item xs={10}>
                    Message :
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        multiline
                        minRows={5}
                        name='message'
                        value={message}
                        onChange={(e)=> { setMessage(e.target.value); setErrorMessage('') }}
                        error={!!errorMessage}
                        helperText={errorMessage}
                        fullWidth
                        id="outlined-basic"
                        variant="outlined" />
                </Grid>
            </Grid>
            {
                user ? (
                    <Button type='submit' sx={{ mt: 2 }} endIcon={<Send />} variant="contained">Send</Button>
                ) : (
                    <Link href='/auth/login'>
                        <Button type='submit' sx={{ mt: 2, textTransform: 'capitalize' }} endIcon={<Login />} variant="contained">Login To Comment</Button>
                    </Link>
                )
            }
           
            
        </form>

    )
}

export default CommentForm