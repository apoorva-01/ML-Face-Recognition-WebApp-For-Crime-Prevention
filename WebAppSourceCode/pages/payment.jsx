import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { DataStore } from '../utils/DataStore';
import CheckoutWizard from '../components/CheckoutWizard';
import { Layout } from '@components/common'
import { useUI } from '@components/ui/context'
import useStyles from '../utils/styles';
import db from "../utils/db";
import Store from "../models/Store";
import {
  Grid,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  Typography,
  RadioGroup,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Button } from '@components/ui'
export default function Payment({store}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(DataStore);
  const { openModal } = useUI()
  const {customerInfo,cart: { shippingAddress }} = state;
  useEffect(() => {
    if (!customerInfo) {
      router.push('/');
      openModal()
    }

    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, [setPaymentMethod, shippingAddress, router,customerInfo,openModal]);




  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', JSON.stringify(paymentMethod));
      router.push('/placeorder');
    }
  };
  return (
    <>
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} lg={6}>
            <List>
              <ListItem>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="Payment Method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    
                    <FormControlLabel
                      label="Online Payment"
                      value="RazorPay"
                      control={<Radio />}
                    ></FormControlLabel>
                    {store?.paymentProviders?.CodAvailable ? (
                      <FormControlLabel
                        label="Cash On Delivery"
                        value="COD"
                        control={<Radio />}
                      ></FormControlLabel>
                    ) : <><Typography fontWeight={700} component="p">Cash On Delivery is Not Available</Typography></>}
                    {/* <FormControlLabel
                      label="PayPal"
                      value="PayPal"
                      control={<Radio />}
                    ></FormControlLabel> */}

                  </RadioGroup>
                </FormControl>
              </ListItem>
              <ListItem>
                <Button type="submit" width="100%" >
                  Continue
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  type="button"
                  width="100%"
                  onClick={() => router.push('/shipping')}
                >
                  Back
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </form>
    </>
  );
}


export async function getServerSideProps({req, res}) {
  await db.connect();
  const store = await Store.find({ _id: process.env.STORE_OBJECT_ID }).lean();
  await db.disconnect();

  return {
    props: {
      store: store.map(db.convertDocToObj)[0],
    },
  };
}

Payment.Layout = Layout
