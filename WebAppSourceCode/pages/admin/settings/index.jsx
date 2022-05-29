import React, { useContext, useEffect } from "react";
import db from "../../../utils/db";
import Store from "../../../models/Store";
import { useRouter } from 'next/router';
import Layout from '../../../layouts/Layout/Layout';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useStyles from '../../../utils/admin/styles';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Text } from '@components/ui'
export default function Setting({store}) {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const router = useRouter();
    useEffect(() => {
        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
    }, [adminStoreInfo]);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const [storeIndustry, setStoreIndustry] = React.useState(
        store ? (
            store.storeDetails ? (
                store.storeDetails.storeIndustry ? (store.storeDetails.storeIndustry) : ''
            ) : ''
        ) : ''
    );
    const handleStoreChange = (e) => {
        setStoreIndustry(e.target.value);
    };
    const [storeAudience, setStoreAudience] = React.useState(
        store ? (
            store.storeDetails ? (
                store.storeDetails.storeAudience ? (store.storeDetails.storeAudience) : ''
            ) : ''
        ) : ''
    );
    const handleStoreAudience = (e) => {
        setStoreAudience(e.target.value);
    };

    const submitHandler = async ({companyName }) => {
        setButtonProgressLoading(true)
        closeSnackbar();

        try {
            await axios.post('/api/admin/store/store-details', {
                storeIndustry, storeAudience, companyName
            });
            // console.log({ storeIndustry, storeAudience, companyName, addressLine1, addressLine2, city, country, state, pinCode})
            //  await dispatch({ type: 'STORE_DETAILS_ADD_ADDRESS',payload:{addressLine1: addressLine1, addressLine2: addressLine2, city: city, country: country, state: state, pinCode: pinCode} });
            //  await dispatch({ type: 'STORE_DETAILS_ADD',payload:{storeIndustry: storeIndustry, storeAudience: storeAudience, companyName: companyName} });

            setButtonProgressLoading(false)
            enqueueSnackbar("Updated Successfully", { variant: 'success' });

        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    };


    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);
    return (
        <Layout>
            <Box sx={{ width: '100%', px: 4 }} >
                {store ? (<>
                    <form onSubmit={handleSubmit(submitHandler)} >
                    <Text variant="pageHeading">Store Details</Text>
                        <Typography fontWeight={700} component="p">Store contact information</Typography>
                        <Typography sx={{ mb: 2 }} component="p">Your customers will use this information to contact you</Typography>
                        <Paper sx={{ p: 3 }} variant="outlined" square>
                            <Typography component="p">Store Name</Typography>
                            <Typography component="p">How would you categorize your store?</Typography>

                            <Controller
                                name="companyName"
                                control={control}
                                rules={{
                                    required: false,
                                    minLength: 2,
                                }}
                              
                            render={({ field }) => (
                                <TextField
                                    variant="outlined"
                                    sx={{ my: 2 }}
                                    fullWidth
                                    defaultValue={store.storeDetails ? (
                                        store.storeDetails.companyName ? (store.storeDetails.companyName) : ''
                                    ) : ''}
                                    id="title"
                                    label='Legal Name Of Company'
                                    inputProps={{ type: 'Title' }}
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


                            <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Store Industry</InputLabel>
                                <Select
                                    label="Store Industry"
                                    onChange={handleStoreChange}
                                    defaultValue={storeIndustry}
                                >
                                    <MenuItem value={'Industrial Automation Parts'}>Industrial Automation Parts</MenuItem>
                                    <MenuItem value={'IOT Devices'}>IOT Devices</MenuItem>
                                    <MenuItem value={'Electronic Devices'}>Electronic Devices</MenuItem>
                                    <MenuItem value={'Water Purificatin Plants'}>Water Purificatin Plants</MenuItem>
                                    <MenuItem value={'Rice Mill Machinery'}>Rice Mill Machinery</MenuItem>
                                    <MenuItem value={'Priniting Machines'}>Priniting Machines</MenuItem>
                                </Select>

                            </FormControl>


                            <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Approximately how large is your audience?</InputLabel>

                                <Select
                                    label="Your Total Audience"
                                    onChange={handleStoreAudience}
                                    defaultValue={storeAudience}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Less Than 1000'}>Less Than 1000</MenuItem>
                                    <MenuItem value={'1000 - 10000'}>1,000 - 10,000</MenuItem>
                                    <MenuItem value={'10000 - 100000'}>10,000 - 100,000</MenuItem>
                                    <MenuItem value={'100000 - 1000000'}>100,000 - 1000,000</MenuItem>
                                    <MenuItem value={'100000 - 1000000'}>100,000 - 1,000,000</MenuItem>
                                    <MenuItem value={'1,000,000 +'}>1,000,000 +</MenuItem>

                                </Select>
                            </FormControl>
                        </Paper>
                        <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
                       
                </form>








                    {/* <TextField fullWidth id="outlined-basic" label={store.username} variant="outlined" disabled /> */}
                {/* <Typography  component="p">https://makemycommerce/{store.username}</Typography> */}

                {/* <Grid sx={{ my: 1 }} container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Typography  component="p">Store contact email</Typography>
                        <TextField fullWidth id="outlined-basic" label={email} variant="outlined" disabled />
                        <Typography  component="p">We'll use this address if we need to contact you about your store.</Typography>

                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography  component="p">Sender email</Typography>
                        <TextField fullWidth id="outlined-basic" label={email} variant="outlined" disabled />
                        <Typography  component="p">Your customers will see this address if you email them.</Typography>

                    </Grid>

                </Grid> */}
            </>) : (<></>)}
        </Box>
        </Layout >

    )
}




export async function getServerSideProps() {
    await db.connect();
    const store = await Store.find({ _id: process.env.STORE_OBJECT_ID }).lean();
    await db.disconnect();
    return {
        props: {
            store: store.map(db.convertDocToObj)[0],
        },
    };
  }
  