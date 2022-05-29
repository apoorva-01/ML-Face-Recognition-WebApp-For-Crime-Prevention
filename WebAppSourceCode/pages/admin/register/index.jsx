import React, { useContext, useEffect } from 'react';
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
const theme = createTheme();
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { ChakraProvider } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
export default function SignUp(props) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;

    useEffect(() => {
        if (adminStoreInfo) {
            router.push('/admin');
        }
        const registerInfo=  Cookies.get('registerInfo')
        if (registerInfo) {
            router.push('/admin/register/add-location');
        }
    }, [adminStoreInfo,router]);

    const submitHandler = async ({ name, storeName, email, phone, password, confirmPassword }) => {
     
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords don't match", { variant: 'error' });
            return;
        }
        try {
            setButtonProgressLoading(true);
            dispatch({ type: 'USER_REGISTER', payload: JSON.stringify({
                storeName,
                name,
                email,
                phone,
                password,
            }) })
            Cookies.set('registerInfo', JSON.stringify({
                storeName,
                name,
                email,
                phone,
                password,
            }));

            router.push(redirect || '/admin/register/add-location');
            setButtonProgressLoading(false);
        } catch (err) {
            enqueueSnackbar(err,
                { variant: 'error' }
            );
        }
    };


    const styles = {
        paperContainer: {
            backgroundImage: `url(/admin/images/bg.png)`,
            height: '100%',
            minHeight: '100vh',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0 2rem 0'
        }
    };

    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);
    return (
        <ThemeProvider theme={theme}>
            <div style={styles.paperContainer}>
                <Container component={Paper} sx={{py:3}}  maxWidth="xs" >
                    <CssBaseline />
                    <form onSubmit={handleSubmit(submitHandler)} >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography textAlign="center" sx={{ fontWeight: 700 }} component="h1" variant="h5">
                                Create an Account
                            </Typography>

                            <Typography textAlign="center" component="h1" variant="h6">
                                No Credit Card Required
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item sm={12} lg={8}>
                                        <Controller
                                            name="storeName"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                                minLength: 2,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth sx={{my:1}}
                                                    id="storeName"
                                                    label="Store Name"
                                                    inputProps={{ type: 'storeName' }}
                                                    error={Boolean(errors.storeName)}
                                                    helperText={
                                                        errors.name
                                                            ? errors.name.type === 'minLength'
                                                                ? 'Store Name length is more than 1'
                                                                : 'Store Name is required'
                                                            : ''
                                                    }
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                                  
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
                                                    fullWidth sx={{my:1}}
                                                    id="name"
                                                    label="Your Name"
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
                                                    fullWidth sx={{my:1}}
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
                                    </Grid>
                                    <Grid item sm={12} lg={6}>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth sx={{my:1}}
                                                    id="phone"
                                                    label="Phone"
                                                    inputProps={{ type: 'number' }}
                                                    error={Boolean(errors.phone)}
                                                    helperText={
                                                        errors.phone
                                                            ? errors.phone.type === 'pattern'
                                                                ? 'Phone is not valid'
                                                                : 'Phone is required'
                                                            : ''
                                                    }
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>
                           
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
                                                    fullWidth sx={{my:1}}
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
                                                    fullWidth sx={{my:1}}
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
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            required
                                            control={<Checkbox required value="allowExtraEmails" color="primary" />}
                                            label="By creating an account you are agreeing to our Terms and Conditions and Privacy Policy"
                                        />
                                    </Grid>
                                </Grid>
                                <ChakraProvider>
                                    <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                                <ButtonSaveProgress text='Register' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                                </div>
                                    {/* <Button className='hvr-grow' type="submit"
                                        fullWidth sx={{my:1}}
                                        style={{ width: '100%', backgroundColor: '#008060', color: 'white', marginTop: '2rem', marginBottom: '2rem' }} >
                                        Register
                                    </Button> */}
                                </ChakraProvider>

                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Link href="/admin/login" variant="body2">
                                            <a>
                                                Already have an account? Login
                                            </a>
                                        </Link>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Box>
                    </form>
                </Container>
            </div>
        </ThemeProvider>
    );
}