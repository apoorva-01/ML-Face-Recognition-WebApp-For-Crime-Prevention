import React, { useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Image from 'next/image'
import Customer from '../../../models/Customer'
import db from '../../../utils/admin/db'
// import EmailTextEditor from '../../../components/admin/customers/email/EmailTextEditor'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from '../../../layouts/Layout/Layout';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Text } from '@components/ui'
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
export default function Home({ customers }) {
  const { state } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const [emailsArray, setEmailArray] = useState([])
  useEffect(() => {
    if (!adminStoreInfo) {
        router.push('/admin/login');
    }
}, [adminStoreInfo]);
  customers.map((element) => {
    emailsArray.push(element.email)
  })

  function callToSendEmail() {
    emailsArray.forEach((email) => SendMail(email))
  }

  function SendMail(email) {
    axios.post('/api/email', { email })
      .then((res) => {
        alert('Email sent successfully')
      }
      ).catch(
        (e) => console.log(e)
      )
  }
  return (
    <>
      <Layout>
   
        <Text variant="pageHeading">All Your Customers</Text>
        <Grid container alignItems="center"
          justifyContent="center">

          <Grid item xs={12} lg={10} sx={{ mt: 3 }}>

            <Box sx={{ width: '100%' }}>
              <Paper elevation={2} >
                {customers.length > 0 && customers ? (
                  <>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Total Orders</TableCell>
                            <TableCell>Tax Exempt</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {customers.map((customer) => (
                            <TableRow key={customer._id}>
                              <TableCell>{customer.name}</TableCell>
                              <TableCell>{customer.phone}</TableCell>
                              <TableCell>{customer.email}</TableCell>
                              <TableCell>{customer.orders_count}</TableCell>
                              <TableCell>{customer.tax_exempt}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  <>
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item xs={3}>
                        <Image src={'/admin/images/dashboard/customers.svg'} alt='No Product Found' width={200} height={200}></Image>
                        <Typography variant='h6' fontWeight={700} component="p">No Customers Found</Typography>
                      </Grid>
                    </Grid>
                  </>)}


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
    </>
  )
}

// export async function getServerSideProps(ctx) {
//   const { req, res } = ctx
//   const { cookies } = req
//   // get the current environment
//   let dev = false;
//   let { DEV_URL, PROD_URL } = process.env;

//   const { data } = await axios.post(`${dev ? DEV_URL : PROD_URL}/api/customers`, {
//     storeID: JSON.parse(cookies.adminStoreInfo)._id,
//   })

//   return {
//     props: {
//       customers: data.message,
//     },
//   };
// }





export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  const { cookies } = req
  await db.connect();
  // const adminStoreInfoID=JSON.parse(cookies.adminStoreInfo)._id
  const customers = await Customer.find({storeID: process.env.STORE_OBJECT_ID}).lean()
  await db.disconnect();
  return {
    props: {
      customers: customers.map(db.convertDocToObj),
    },
  };
}
