import React, { useContext, useEffect, useState } from "react";
import db from "../../../utils/db";
import Store from "../../../models/Store";
import Layout from '../../../layouts/Layout/Layout';
import Link from 'next/link'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { Text } from '@components/ui'
export default function PaymentProviders({ store }) {
  const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);
  const { state } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (!adminStoreInfo) {
      router.push('/admin/login');
    }
  }, [router, adminStoreInfo]);
  const [CodAvailable, setCodAvailable] = useState(store?.paymentProviders?.CodAvailable)


  const submitHandler = async ({ key, secret }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/admin/store/payment-provider', {
        storeID: store._id,
        CodAvailable: CodAvailable,
        key,
        secret,
      });
      enqueueSnackbar(
        'Updated Successfully', { variant: 'success' }
      );
    } catch (err) {
      enqueueSnackbar(
        err, { variant: 'error' }
      );
    }
  };


  console.log(store?.paymentProviders?.CodAvailable)
  return (
    <Layout>
      <Text variant="pageHeading">Payment Providers</Text>
      {adminStoreInfo ? (
        <form onSubmit={handleSubmit(submitHandler)} >

          <Paper sx={{ p: 2, my: 2 }} variant="outlined" square>

            <Typography fontWeight={700} component="p">Razorpay</Typography>
            <Box sx={{
              mt: 1, display: 'flex',
              flexDirection: 'row',
            }}>
              <Image width="100" height="100" src='/admin/images/dashboard/rajorpay.jpg' alt='Razorpay'></Image>
              <Box>
                <Controller
                  name="key"
                  control={control}
                  defaultValue={store?.paymentProviders?.razorpay?.key ? store.paymentProviders?.razorpay?.key : ''}
                  rules={{
                    // required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ my: 4 }}
                      // placeholder={store.paymentProviders[0].razorpay.key}
                      variant="outlined"
                      fullWidth
                      id="key"
                      label="Razorpay Key"
                      inputProps={{ type: 'text' }}
                      error={Boolean(errors.key)}
                      helperText={
                        errors.key
                          ? 'Key is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>

                <Controller
                  name="secret"
                  control={control}
                  defaultValue={store?.paymentProviders?.razorpay?.secret ? store.paymentProviders?.razorpay?.secret : ''}
                  rules={{
                    // required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ mb: 4 }}
                      variant="outlined"
                      // placeholder={store.paymentProviders[0].razorpay.secret}
                      fullWidth
                      id="secret"
                      label="Razorpay Secret"
                      inputProps={{ type: 'text' }}
                      error={Boolean(errors.secret)}
                      helperText={
                        errors.secret
                          ? errors.secret.type === 'minLength'
                            ? 'Secret length is more than 5'
                            : 'Secret is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>


              </Box>


            </Box>
          </Paper>

          <Paper sx={{ p: 2, my: 2 }} variant="outlined" square>
            <Typography fontWeight={700} component="p">Cash On Delivery</Typography>
            <FormControl>
              <RadioGroup defaultValue={CodAvailable}>
                <FormControlLabel onClick={() => setCodAvailable(true)} value="true" control={<Radio />} label="Available" />
                <FormControlLabel onClick={() => setCodAvailable(false)} value="false" control={<Radio />} label="Not Available" />
              </RadioGroup>
            </FormControl>
          </Paper>


          <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />

        </form>
      ) : (<></>)}
    </Layout>

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
