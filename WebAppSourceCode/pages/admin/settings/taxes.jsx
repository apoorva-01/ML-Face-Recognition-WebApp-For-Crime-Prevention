import React, { useContext, useState,useEffect } from "react";
import db from "../../../utils/db";
import Store from "../../../models/Store";
import Layout from '../../../layouts/Layout/Layout';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import { Text } from '@components/ui'
export default function Taxes({store}) {
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
const[allPricesIncludeTaxes,setAllPricesIncludeTaxes]=useState(store.taxes.allPricesIncludeTaxes)
const[shippingRatesTax,setShippingRatesTax]=useState(store.taxes.shippindigitalProductVATgRatesTax)
const[digitalProductVAT,setDigitalProductVAT]=useState(store.taxes.digitalProductVAT)

  const submitHandler = async ({}) => {
    setButtonProgressLoading(true)
    closeSnackbar();
    try {
        await axios.post('/api/admin/store/taxes', {
          allPricesIncludeTaxes:allPricesIncludeTaxes,
          shippingRatesTax:shippingRatesTax,
          digitalProductVAT:digitalProductVAT
        });
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
          <Text variant="pageHeading">Tax calculations</Text>
            <Typography sx={{ mb: 2 }} component="p">Manage how your store calculates and shows tax on your store.</Typography>
            <Paper sx={{ p: 3 }} variant="outlined" square>

              <FormControlLabel
                control={
                  <Checkbox
                    name="SomeName"
                    defaultChecked={allPricesIncludeTaxes}
                    onChange={()=>{setAllPricesIncludeTaxes(allPricesIncludeTaxes===true?(false):true)}}
                  />
                }
                label="All prices include tax" />
              <Typography sx={{ mb: 2 }} component="p"> Taxes charged on shipping rates are included in the shipping price.</Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    name="SomeName"
                    defaultChecked={shippingRatesTax}
                    onChange={()=>{setShippingRatesTax(shippingRatesTax===true?(false):true)}}
                  />
                }
                label="Charge tax on shipping rates" />
              <Typography sx={{ mb: 2 }} component="p">
                In Canada, European Union, and United States, this happens automatically whether you select this setting or not. For all other regions, select this setting to apply tax on shipping rates.</Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    name="SomeName"
                    defaultChecked={digitalProductVAT}
                    onChange={()=>{setDigitalProductVAT(digitalProductVAT===true?(false):true)}}
                  />
                }
                label="Charge VAT on digital goods" />
              <Typography sx={{ mb: 2 }}component="p">

                This creates a collection for you to add your digital products. Products in this collection will have VAT applied at checkout for European customers.</Typography>

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
