import React, { useContext, useEffect } from 'react';
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import {
    List,
    ListItem,
} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
const theme = createTheme();
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataStore } from '../utils/DataStore';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function SignUp(props) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = useContext(DataStore);
    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, [router, userInfo]);

    const submitHandler = async ({ name, email, password, confirmPassword }) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords don't match", { variant: 'error' });
            return;
        }
        try {
            const { data } = await axios.post('/api/users/register', {
                name,
                email,
                password,
            });
            console.log(data);
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('userInfo', data);
            router.push(redirect || '/');
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    };

    const styles = {
        paperContainer: {
            backgroundImage: `url(/bg.png)`,
            height: '100%',
            minHeight: '100vh',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0 2rem 0'
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <div style={styles.paperContainer}>
                <Container component={Paper} sx={{ py: 3 }} maxWidth="xs" >
                    <CssBaseline />
                    <form onSubmit={handleSubmit(submitHandler)} >
                        <Typography align="center" component="h1" variant="h4">
                            Register
                        </Typography>
                        <List>
                            <ListItem>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                        minLength: 2,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            inputProps={{ type: 'name' }}
                                            error={Boolean(errors.name)}
                                            helperText={
                                                errors.name
                                                    ? errors.name.type === 'minLength'
                                                        ? 'Name length is more than 1'
                                                        : 'Name is required'
                                                    : ''
                                            }
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            </ListItem>
                            <ListItem>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            inputProps={{ type: 'email' }}
                                            error={Boolean(errors.email)}
                                            helperText={
                                                errors.email
                                                    ? errors.email.type === 'pattern'
                                                        ? 'Email is not valid'
                                                        : 'Email is required'
                                                    : ''
                                            }
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            </ListItem>
                            <ListItem>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                        minLength: 6,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            inputProps={{ type: 'password' }}
                                            error={Boolean(errors.password)}
                                            helperText={
                                                errors.password
                                                    ? errors.password.type === 'minLength'
                                                        ? 'Password length is more than 5'
                                                        : 'Password is required'
                                                    : ''
                                            }
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            </ListItem>
                            <ListItem>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                        minLength: 6,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="confirmPassword"
                                            label="Confirm Password"
                                            inputProps={{ type: 'password' }}
                                            error={Boolean(errors.confirmPassword)}
                                            helperText={
                                                errors.confirmPassword
                                                    ? errors.confirmPassword.type === 'minLength'
                                                        ? 'Confirm Password length is more than 5'
                                                        : 'Confirm  Password is required'
                                                    : ''
                                            }
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" type="submit" fullWidth color="primary">
                                    Register
                                </Button>
                            </ListItem>
                            <ListItem>
                                Already have an account? &nbsp;
                                <Link href={`/login?redirect=${redirect || '/'}`} >
                                    <a>Login</a>
                                </Link>
                            </ListItem>
                        </List>
                    </form>
                </Container>
            </div>
        </ThemeProvider>
    );
}