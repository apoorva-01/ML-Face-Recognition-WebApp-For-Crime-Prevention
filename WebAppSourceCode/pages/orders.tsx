import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  TableContainer,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
 
} from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import { DataStore } from '../utils/DataStore';
import useStyles from '../utils/styles';
import { Button } from '@components/ui'

function reducer(state:any, action:any) {
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


export default function Orders() {
  const { state } = useContext(DataStore);
  const router = useRouter();
  const classes = useStyles();
  const { customerInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    if (!customerInfo) {
      router.push('/login');
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${customerInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err });
      }
    };
    fetchOrders();
  }, [customerInfo, router]);
  return (
    <Container>
      <Text variant="pageHeading">My Orders</Text>
      {orders.length === 0 ? (


        <div className="flex-1 p-24 flex flex-col justify-center items-center ">
          <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            No Orders Found
          </h2>
          <p className="text-accent-6 px-10 text-center pt-2">
          <Link href='/'><a>Go Shopping Now</a></Link>
          </p>
        </div>

      ) : (
        <Card className={classes.section}>
          <List>
            <ListItem>
            </ListItem>
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography className={classes.error}>{error}</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>DATE</b></TableCell>
                        <TableCell><b>TOTAL</b></TableCell>
                        <TableCell><b>PAYMENT METHOD</b></TableCell>
                        <TableCell><b>ORDER STATUS</b></TableCell>
                        <TableCell><b>ACTION</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order:any) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id.substring(20, 24)}</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          <TableCell>${order.totalPrice}</TableCell>
                          <TableCell>
                          {order?.paymentMethod}
                          </TableCell>
                          <TableCell>
                            {order?.orderStatus}
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/order/${order._id}`} passHref>
                              <Button width="100%" >Details</Button>
                            </NextLink>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </ListItem>
          </List>
        </Card>
      )}
    </Container>
  )
}

Orders.Layout = Layout
