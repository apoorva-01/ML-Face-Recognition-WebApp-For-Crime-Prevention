import React, { useContext, useEffect, useState } from "react";
import db from "../../../utils/db";
import Store from "../../../models/Store";
import Layout from '../../../layouts/Layout/Layout';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Text } from '@components/ui'
import Link from 'next/link'
import Image from 'next/image'
import Stack from '@mui/material/Stack';
export default function Billing({ store }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
    useEffect(() => {
        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
    }, [adminStoreInfo]);


  const submitHandler = async ({ }) => {
    setButtonProgressLoading(true)
    closeSnackbar();
  };
  const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);


  return (
    <Layout>
      <Text variant="pageHeading">Billing</Text>

      <Box sx={{ width: '100%', px: 4 }} >
        {store ? (<>
          <form onSubmit={handleSubmit(submitHandler)} >


            <Paper sx={{ p: 2, my: 2 }} variant="outlined" square>
              <Typography fontWeight={700} component="p">Subscription</Typography>
              <Link href='/plan'><a><Typography sx={{ mb: 2 }} component="p">View all subscriptions plans</Typography></a></Link>

              <Stack direction="row" spacing={2}>
                <Image src='/admin/images/logo.svg' width={50} height={50} alt='Make My Commerce' />
                <Typography variant="h6" component='p' color="text.secondary">{store.plan}</Typography>
              </Stack>
            </Paper>



            <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />

          </form>





        </>) : (<></>)}
      </Box>
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
