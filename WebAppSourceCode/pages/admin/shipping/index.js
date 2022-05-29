import React, { useEffect, useContext, useReducer } from 'react';
import {
    Grid,
    TableContainer,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import Layout from '../../../layouts/Layout/Layout';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import AddShippingZone from '../../../components/admin/settings/shipping/AddShippingZone'
import useStyles from '../../../utils/admin/styles';
import axios from 'axios';
import { useRouter } from 'next/router';
function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, shipping: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}
function Shipping() {
    const classes = useStyles();
    const { state } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const router = useRouter();
    const [{ loading, error, shipping }, dispatch] = useReducer(reducer, {
        loading: true,
        shipping: [],
        error: '',
    });



    
  
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.post(`/api/admin/shipping/`, {
                    storeID: adminStoreInfo._id,
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err });
            }
        };

        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
        fetchOrders();
    }, [router,adminStoreInfo]);

    return (
        <Layout>
            {loading ? (
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={12} >
                        <CircularProgress />
                    </Grid></Grid>
            ) : error ? (
                <Typography className={classes.error}>{error}</Typography>
            ) : (
                <>
                    {shipping ? (
                        <>
                            <AddShippingZone shipping={shipping} />
                            <Box sx={{ width: '100%', px: 4 }} >
                                <Paper sx={{ p: 3 }} variant="outlined" square>
                                    {shipping[0]?.shippingZones ? (
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Zone Name</TableCell>
                                                        <TableCell>Countries</TableCell>
                                                        <TableCell>Condition</TableCell>
                                                        <TableCell>Rate</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {shipping[0]?.shippingZones.map((shippingZone) => (
                                                        <TableRow key={shippingZone._id}>
                                                            <TableCell>{shippingZone.zoneName}</TableCell>

                                                            {shippingZone.countries?(
                                                            <TableCell>{shippingZone.countries.map((country) => (
                                                                <>{country}</>
                                                            ))}</TableCell>
                                                            ):(<></>)}
                                                        </TableRow>
                                                    ))}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    ) : (<>
                                        <Grid
                                            container
                                            spacing={0}
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item xs={3}>
                                                <Image src={'/admin/images/dashboard/shipping.svg'} alt='No Product Found' width={200} height={200}></Image>
                                                <Typography variant='h6' fontWeight={900} component="p" align='center'>No Shipping Zones Yet</Typography>
                                                <Typography component="p" align='center'>Your shippingZones will show here.<br /></Typography>
                                            </Grid>
                                        </Grid>
                                    </>)}

                                </Paper>
                            </Box>
                        </>
                    ) : (<></>)}
                </>)}

        </Layout >
    );
}





export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
