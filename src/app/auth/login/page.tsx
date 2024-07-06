'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, CardContent, Container, Grid, Input, TextField, Typography } from '@mui/material';
import { theme } from '../../../../theme/Theme';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import * as Yup from 'yup';
import { Send } from '@mui/icons-material';
import LoadingButton from '@/app/components/LoadingButton';

interface ValidationErrors {
  password?: string
  email?: string
}

const initialUser = {
  email: '',
  password: ''
}


const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const [form, setForm] = useState(initialUser)
  const {setShowSnackbar, setSnackbarMessage} = useAuth()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email()
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const handleInput = (e: any) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  }

  const validate = async (): Promise<ValidationErrors> => {

    try {
      await validationSchema.validate(form, { abortEarly: false });
      return {};
    } catch (err) {
      const validationErrors: ValidationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError) => {
          if (error.path) {
            validationErrors[error.path as keyof FormValues] = error.message;
          }
        });
      }
      return validationErrors;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length === 0) {

      try {
        await login(form);
        
        setShowSnackbar(true)
        setSnackbarMessage('Logined in successfully')
        router.push('/blogs');
      } catch (error) {
        setShowSnackbar(true)
        setSnackbarMessage('Server error. Please try again later')
      }
    } else {
      setErrors(validationErrors);
    }

    setIsLoading(false)
  };

  return (
    <>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3, display: 'felx', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item md={6}>
            <Box width={{ bgcolor: grey[200] }}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ fontSize: 25, mb: 4, textAlign: 'center', color: theme.palette.primary.main, fontWeight: 900 }}>
                    Login Your Account
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      type="email"
                      id="email"
                      name='email'
                      fullWidth
                      size="small"
                      label="Email"
                      value={form.email}
                      onChange={handleInput}
                      error={!!errors.email}
                      helperText={errors.email}
                    />

                    <TextField
                      type="password"
                      id="password"
                      name='password'
                      value={form.password}
                      fullWidth
                      size="small"
                      label="Password"
                      sx={{ mt: 4 }}
                      error={!!errors.password}
                      helperText={errors.password}
                      onChange={handleInput}
                    />

                    <LoadingButton btnText='Login' isLoading={isLoading} />
                    <Typography sx={{ mt: 3 }}>
                      If you don't have account, register first.
                      <Link href="/auth/register" className='register-link'>Click here to register</Link>
                    </Typography>

                  </form>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </>
  );
};

export default LoginPage;
