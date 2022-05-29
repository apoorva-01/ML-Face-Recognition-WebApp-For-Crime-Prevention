import React, { useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Image from 'next/image'
import EmailTextEditor from '../../../components/admin/customers/email/EmailTextEditor'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from '../../../layouts/Layout/Layout';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
export default function Home({ customers }) {
  const { state } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);
  const [emailsArray, setEmailArray] = useState([])
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  customers.map((element) => {
    emailsArray.push(element.email)
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!adminStoreInfo) {
        router.push('/admin/login');
    }
  }, [adminStoreInfo]);
  function callToSendEmail() {

  }

  function SendMail(email) {
    setButtonProgressLoading(true);
    axios.post('/api/admin/email', { email })
      .then((res) => {
        setButtonProgressLoading(false);
      }
      ).catch(
        (e) => console.log(e)
      )
  }



  const submitHandler = async () => {
    setButtonProgressLoading(true);
    closeSnackbar();
    try {
      emailsArray.forEach((email) => SendMail(email));
      setButtonProgressLoading(false);
      enqueueSnackbar('Email sent successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' }
      );
    }
  };





  return (
    <>
      <Layout>
        <Typography
          style={{ margin: '1rem', fontWeight: 900 }}
          variant="h5"
          component="p"
          align='center'
        >
          Email Campaign
        </Typography>
        <Grid container alignItems="center"
          justifyContent="center">

          <Grid item xs={12} lg={10} sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit(submitHandler)} >
              <Box sx={{ width: '100%' }}>
                <Paper elevation={2} >
                  <EmailTextEditor />

                </Paper>

              </Box>
              <ButtonSaveProgress text='Send' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />
            </form>
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
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  const { cookies } = req
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  const { data } = await axios.post(`${dev ? DEV_URL : PROD_URL}/api/admin/customers`, {
    storeID: JSON.parse(cookies.adminStoreInfo)._id,
  })

  return {
    props: {
      customers: data.message,
    },
  };
}