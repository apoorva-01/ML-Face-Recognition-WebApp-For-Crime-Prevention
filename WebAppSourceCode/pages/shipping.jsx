import {
  List,
  ListItem,
  Grid,
  TextField,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useUI } from '@components/ui/context'
import React, { useContext, useEffect } from 'react';
import { DataStore } from '../utils/DataStore';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import { Button } from '@components/ui'
import { Layout } from '@components/common'
export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(DataStore);
  const {
    customerInfo,
    cart: { shippingAddress },
  } = state;

  const { closeSidebarIfPresent, openModal } = useUI()
  useEffect(() => {
    closeSidebarIfPresent()
    if (!customerInfo) {
      router.push('/');
      openModal()
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.address);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [customerInfo,setValue,router,shippingAddress.fullName,shippingAddress.address,shippingAddress.postalCode, shippingAddress.country,openModal,closeSidebarIfPresent]);

  const classes = useStyles();
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set('shippingAddress', JSON.stringify({
      fullName,
      address,
      city,
      postalCode,
      country,
    }));
    router.push('/payment');
  };
  return (
    <>
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>


        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} lg={6}>
       
            <List>
              <ListItem>
                <Controller
                  name="fullName"
                  defaultValue={customerInfo?.name}
                  control={control}
                  rules={{
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="fullName"
                      defaultValue={customerInfo?.name}
                      label="Full Name"
                      error={Boolean(errors.fullName)}
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="address"
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
                      id="address"
                      label="Address"
                      error={Boolean(errors.address)}
                      helperText={
                        errors.address
                          ? errors.address.type === 'minLength'
                            ? 'Address length is more than 1'
                            : 'Address is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="city"
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
                      id="city"
                      label="City"
                      error={Boolean(errors.city)}
                      helperText={
                        errors.city
                          ? errors.city.type === 'minLength'
                            ? 'City length is more than 1'
                            : 'City is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="postalCode"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="postalCode"
                      label="Postal Code"
                      type="number"
                      error={Boolean(errors.postalCode)}
                      helperText={
                        errors.postalCode
                          ? errors.postalCode.type === 'minLength'
                            ? 'Postal Code length is more than 1'
                            : 'Postal Code is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="country"
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
                      id="country"
                      label="Country"
                      error={Boolean(errors.country)}
                      helperText={
                        errors.country
                          ? errors.country.type === 'minLength'
                            ? 'Country length is more than 1'
                            : 'Country is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
   
                <Button type="submit"  width="100%" >
                 Continue
                </Button>
               
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </form>

      </>
  );
}

Shipping.Layout = Layout