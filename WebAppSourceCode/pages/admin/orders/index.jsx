import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import React, { useEffect, useContext, useReducer } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useSnackbar } from 'notistack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { Text } from '@components/ui'
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import Layout from '../../../layouts/Layout/Layout';
import useStyles from '../../../utils/admin/styles';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderHistory() {
  const { state } = useContext(AdminDataStore);
  const router = useRouter();
  const classes = useStyles();
  const { adminStoreInfo } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  async function ConfirmOrder(e) {
    if (e.isConfirmed === true) {
      enqueueSnackbar("Confirmed Order Can't be Reversed", { variant: 'error' }
      );
    } else {
      await axios.put(`/api/admin/orders/confirm`, {
        orderID: e._id,
      });

      enqueueSnackbar("Order Confirmed", { variant: 'success' })
    }

  }

  useEffect(() => {
    if (!adminStoreInfo) {
      router.push('/admin/login');
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.post(`/api/admin/orders/history`, {
          storeID: adminStoreInfo._id,
        }, {
          headers: { authorization: `Bearer ${adminStoreInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    fetchOrders();
  }, [router, adminStoreInfo]);


  async function handleOrderStatusChange(order, e) {
    await axios.put(`/api/admin/orders/order-status-change`, {
      orderID: order._id,
      orderStatus: e
    });
    enqueueSnackbar("Order Status Updated Successfully", { variant: 'success' })
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };
  return (
    <Layout>

      <Text variant="pageHeading"> Orders</Text>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} >
          <Stack sx={{my:2}} direction="row" spacing={1}>
            <Chip label="Clickable" onClick={handleClick} />
            <Chip label="Clickable" variant="outlined" onClick={handleClick} />
          </Stack>
          <Box sx={{ width: '100%' }}>
            <Paper elevation={2}>
              <List>
                <ListItem>
                  {loading ? (
                    <Grid container alignItems="center" justifyContent="center">
                      <Grid item xs={12} >
                        <CircularProgress />
                      </Grid></Grid>
                  ) : error ? (
                    <Typography className={classes.error}>{error}</Typography>
                  ) : (
                    <>

                      {orders.length > 0 && orders ? (
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell><b>ID</b></TableCell>
                                <TableCell><b>DATE</b></TableCell>
                                <TableCell><b>TOTAL</b></TableCell>
                                <TableCell><b>PAYMENT METHOD</b></TableCell>
                                <TableCell><b>ACCEPT ORDER</b></TableCell>
                                <TableCell><b>ORDER STATUS</b></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {orders.map((order) => (

                                <TableRow key={order?._id}>
                                  <Link href={`/admin/order/${order?._id}`}>
                                    <a>
                                      <TableCell>Order #{order?._id.substring(20, 24)}</TableCell>
                                    </a>
                                  </Link>
                                  <TableCell>{order?.createdAt}</TableCell>
                                  <TableCell>${order?.totalPrice}</TableCell>
                                  <TableCell>
                                    {`${order?.paymentMethod}`}
                                  </TableCell>

                                  <TableCell>
                                    <Checkbox onChange={() => ConfirmOrder(order)} checked={order?.isConfirmed === true ? true : false} />
                                  </TableCell>
                                  <TableCell>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                      <Select
                                        defaultValue={order.orderStatus}
                                        onChange={(e) => handleOrderStatusChange(order, e.target.value)}
                                      >
                                        <MenuItem value={'Pending'}>Pending</MenuItem>
                                        <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
                                        <MenuItem value={'Shipped'}>Shipped</MenuItem>
                                        <MenuItem value={'Delivered'}>Delivered</MenuItem>

                                      </Select>
                                    </FormControl>
                                  </TableCell>
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
                            <Image src={'/admin/images/dashboard/orders.svg'} alt='No Product Found' width={200} height={200}></Image>
                            <Typography variant='h4' fontWeight={900} component="p" align='center'>No Orders Yet</Typography>
                            <Typography component="p" align='center'>Your orders will show here.<br />
                              To get orders and accept payments from customers, you need to select a plan.</Typography>
                          </Grid>
                        </Grid>
                      </>)}

                    </>
                  )}
                </ListItem>
              </List>
            </Paper>
          </Box>
        </Grid>












        {/* 
          <Grid item xs={12} lg={8} >
            <Container container justify="center" align="center">
              <EmailTextEditor />
            </Container>
          </Grid>
          <Grid item xs={12} lg={4}>
            <ChakraProvider>
              <Button onClick={() => callToSendEmail()} style={{ color: '#008060', marginBottom: '1rem' }} variant="outline">
                Send Email
              </Button>
            </ChakraProvider>
          </Grid> */}
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
