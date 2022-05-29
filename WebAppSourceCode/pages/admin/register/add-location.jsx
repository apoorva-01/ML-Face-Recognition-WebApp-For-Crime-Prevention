import React, { useContext, useEffect,useState } from 'react';
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
    const [registerInfo,setRegisterInfo] =useState(JSON.parse(Cookies.get('registerInfo')?Cookies.get('registerInfo'):null))



    useEffect(() => {
        if (adminStoreInfo) {
            router.push('/admin/');
        }
        
        if (!registerInfo) {
            router.push('/admin/register');
        }
    }, [adminStoreInfo,registerInfo,router]);



    const submitHandler = async ({ companyName,storeIndustry, addressLine1, addressLine2, city, state, pinCode, country }) => {
  
   
        closeSnackbar();
        try {
            setButtonProgressLoading(true);

            
            const { data } = await axios.post('/api/admin/users/register', {
                storeName: registerInfo.storeName,
                name: registerInfo.name,
                email: registerInfo.email,
                phone: registerInfo.phone,
                password: registerInfo.password,
                companyName:companyName,
                storeIndustry:storeIndustry,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city:city,
                state:state,
                pinCode:pinCode,
                country:country
            });
            dispatch({ type: 'USER_LOGIN', payload: data });
            Cookies.set('adminStoreInfo', JSON.stringify(data));
            router.push(redirect || '/admin');
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
                <Container component={Paper} sx={{ py: 3 }} maxWidth="xs" >
                    <CssBaseline />
                    <form onSubmit={handleSubmit(submitHandler)} >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography textAlign="center" style={{ fontWeight: 700 }} component="p" variant="h5">
                                Add an address so you can get paid

                            </Typography>

                            <Typography textAlign="center" component="h1" variant="h6">
                                This will be used as your default business address. You can always change this later.
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} >

                                        <Controller
                                            name="companyName"
                                            control={control}
                                            defaultValue={''}
                                            rules={{
                                                required: false,
                                                minLength: 2,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    sx={{ my: 2 }}
                                                    fullWidth
                                                    id="title"
                                                    label='Legal Name Of Company'
                                                    inputProps={{ type: 'text' }}
                                                    error={Boolean(errors.companyName)}
                                                    helperText={
                                                        errors.name
                                                            ? errors.name.type === 'minLength'
                                                                ? 'Company Name length is more than 1'
                                                                : ''
                                                            : ''
                                                    }
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>

                                        <Controller
                                            name="storeIndustry"
                                            control={control}
                                            defaultValue={''}
                                            rules={{
                                                required: true,
                                                minLength: 2,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    sx={{ my: 2 }}
                                                    fullWidth
                                                    id="title"
                                                    label='Store Industry'
                                                    inputProps={{ type: 'text' }}
                                                    error={Boolean(errors.companyName)}
                                                    helperText={
                                                        errors.name
                                                            ? errors.name.type === 'minLength'
                                                                ? 'Store Industry Name length is more than 1'
                                                                : ''
                                                            : ''
                                                    }
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>




                                        <Controller
                                            name="addressLine1"
                                            control={control}
                                            defaultValue={''}
                                            rules={{
                                                required: false,
                                                minLength: 2,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    sx={{ my: 2 }}
                                                    fullWidth
                                                    id="addressLine1"
                                                    label='Address'
                                                    inputProps={{ type: 'text' }}
                                                    error={Boolean(errors.addressLine1)}
                                                    helperText={
                                                        errors.name
                                                            ? errors.name.type === 'minLength'
                                                                ? 'Address  length should be more than 2 characters'
                                                                : ''
                                                            : ''
                                                    }
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>


                                        <Controller
                                            name="addressLine2"
                                            control={control}
                                            defaultValue={''}
                                            rules={{
                                                required: false,
                                                minLength: 2,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    sx={{ my: 2 }}
                                                    fullWidth
                                                    id="addressLine2"
                                                    label='Apartment, suite, etc.'
                                                    inputProps={{ type: 'text' }}
                                                    error={Boolean(errors.addressLine2)}
                                                    helperText={
                                                        errors.name
                                                            ? errors.name.type === 'minLength'
                                                                ? 'Address  length should be more than 2 characters'
                                                                : ''
                                                            : ''
                                                    }
                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>


                                        <Controller
                                            name="city"
                                            control={control}
                                            defaultValue={''}
                                            rules={{
                                                required: false,
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    variant="outlined"
                                                    sx={{ my: 2 }}
                                                    fullWidth
                                                    id="city"
                                                    label='City'
                                                    inputProps={{ type: 'text' }}
                                                    error={Boolean(errors.city)}

                                                    {...field}
                                                ></TextField>
                                            )}
                                        ></Controller>




                                        <Grid sx={{ my: 1 }} container spacing={2}>

                                            <Grid item xs={12} lg={4}>
                                                <Controller
                                                    name="state"
                                                    control={control}
                                                    defaultValue={''}
                                                    rules={{
                                                        required: false,
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            variant="outlined"
                                                            sx={{ my: 2 }}
                                                            fullWidth
                                                            id="state"
                                                            label='State'
                                                            inputProps={{ type: 'text' }}
                                                            error={Boolean(errors.state)}

                                                            {...field}
                                                        ></TextField>
                                                    )}
                                                ></Controller>


                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <Controller
                                                    name="pinCode"
                                                    control={control}
                                                    defaultValue={''}
                                                    rules={{
                                                        required: false,
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            variant="outlined"
                                                            sx={{ my: 2 }}
                                                            fullWidth
                                                            id="pinCode"
                                                            label='Pin Code'
                                                            inputProps={{ type: 'number' }}
                                                            error={Boolean(errors.pinCode)}
                                                            {...field}
                                                        ></TextField>
                                                    )}
                                                ></Controller>


                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <Controller
                                                    name="country"
                                                    control={control}
                                                    defaultValue={''}
                                                    rules={{
                                                        required: false,
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            variant="outlined"
                                                            sx={{ my: 2 }}
                                                            fullWidth
                                                            id="country"
                                                            label='Country / Region'
                                                            inputProps={{ type: 'text' }}
                                                            error={Boolean(errors.country)}

                                                            {...field}
                                                        ></TextField>
                                                    )}
                                                ></Controller>

                                            </Grid>
                                        </Grid>


                                    </Grid>

                                </Grid>
                                <ChakraProvider>
                                    <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>

                                        <ButtonSaveProgress text='Register' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                                    </div>
                                    {/* <Button className='hvr-grow' type="submit"
                                        fullWidth sx={{ my: 1 }}
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