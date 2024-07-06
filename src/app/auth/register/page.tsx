'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import createAxios from '@/lib/axios';
import * as Yup from 'yup';
import { Box, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { theme } from '../../../../theme/Theme';
import LoadingButton from '@/app/components/LoadingButton';
import Link from 'next/link';

interface ValidationErrors {
  [key: string]: string;
}

const initialUser = {
  email: '',
  password: '',
  name: ''
}


const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState(initialUser)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const { setShowSnackbar, setSnackbarMessage } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
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
            validationErrors[error.path] = error.message;
          }
        });
      }
      return validationErrors;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await createAxios.post('/register', form);
        await login(form);
        setShowSnackbar(true)
        setSnackbarMessage('Registered in successfully')
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
    <div>
      <title>Register</title>
      <meta name="description" content='lorem sdf asldkAccess essential travel resources, tools, and guides to help you plan and enjoy your trips' />
      <meta name="keywords" content={`find travel tips,  hiking, diving, `} />
    </div>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3, display: 'felx', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item md={6}>
            <Box >
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" sx={{ fontSize: 25, mb: 4, textAlign: 'center', color: theme.palette.primary.main, fontWeight: 900 }}>
                    Register Your Account
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      type="name"
                      id="name"
                      name='name'
                      fullWidth
                      size="small"
                      label="Your name"
                      value={form.name}
                      onChange={handleInput}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
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
                      sx={{ mt: 4 }}
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
                    <LoadingButton btnText='Register' isLoading={isLoading} />
                    <Typography sx={{ mt: 3 }}>
                      If you've already registered, 
                      <Link href="/auth/login" className='register-link'>pelase log in here</Link>
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

export default RegisterPage;
