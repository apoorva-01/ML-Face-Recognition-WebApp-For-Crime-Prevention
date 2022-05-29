import React, { useContext, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import PhysicalProduct from '../../../models/PhysicalProduct'
import DigitalProduct from '../../../models/DigitalProduct'
import db from '../../../utils/admin/db'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Layout from '../../../layouts/Layout/Layout';
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Table from '@mui/material/Table';
import { useRouter } from 'next/router';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';

export default function Products({ digitalProducts, physicalProducts }) {
  const { state } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const router = useRouter();


  useEffect(() => {
    if (!adminStoreInfo) {
      router.push('/admin/login');
    }
  }, [router, adminStoreInfo]);

  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Layout>
      <ChakraProvider>
        <Link href='/admin/add-product'>
          <a>
            <Button style={{ color: '#008060', marginBottom: '1rem' }} variant="outline">
              Add Product
            </Button>
          </a>
        </Link>
      </ChakraProvider>


      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList centered onChange={handleTabChange}>
              <Tab label="Physical Products" value="1" />
              <Tab label="Digital Products" value="2" />
            </TabList>
          </Box>

          {/* Physical Products*/}
          <TabPanel value="1">
            {physicalProducts.length > 0 && physicalProducts ? (
              <Paper>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>MEDIA</TableCell>
                        <TableCell>PRODUCT</TableCell>
                        <TableCell>PRICE</TableCell>
                        <TableCell>INVENTORY</TableCell>
                        <TableCell>STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {physicalProducts.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            {product.images?.[0] ? (
                              <Image src={`/assets${product.images[0]?.url}`} alt={product.images?.[0]?.altText} width={40} height={40}></Image>
                            ) : null}
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.price?.value + ` ` + product.price?.currencyCode}</TableCell>
                          <TableCell>{product.inventory}</TableCell>
                          <TableCell>{product.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
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
                    <Image src={'/admin/images/dashboard/physical-products.svg'} alt={'No Product Found'} width={200} height={200}></Image>
                    <Typography variant='h6' fontWeight={700} component="p">No Physical Products Found</Typography>
                  </Grid>
                </Grid>
              </>

            )}

          </TabPanel>


          {/* Digital Products*/}
          <TabPanel value="2">
            {digitalProducts.length > 0 && digitalProducts ? (
              <Paper>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>MEDIA</TableCell>
                        <TableCell>PRODUCT</TableCell>
                        <TableCell>PRICE</TableCell>
                        <TableCell>STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {digitalProducts.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            {product.images?.[0] ? (
                              <Image src={product.images?.[0]?.url} alt={product.images?.[0]?.altText} width={40} height={40}></Image>
                            ) : null}
                          </TableCell>

                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.price?.value + ` ` + product.price?.currencyCode}</TableCell>
                          <TableCell>{product.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
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
                    <Image src={'/admin/images/dashboard/products.svg'} alt={'No Product Found'} width={200} height={200}></Image>
                    <Typography variant='h6' fontWeight={700} component="p">No Digital Products Found</Typography>
                  </Grid>
                </Grid>
              </>)}


          </TabPanel>
        </TabContext>
      </Box>











    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { req } = ctx
  const { cookies } = req

  await db.connect();
  const physical_products = await PhysicalProduct.find({ storeID: process.env.STORE_OBJECT_ID }).lean();
  const digital_products = await DigitalProduct.find({ storeID: process.env.STORE_OBJECT_ID }).lean();
  await db.disconnect();


  return {
    props: {
      digitalProducts: digital_products.map(db.convertDocToObj),
      physicalProducts: physical_products.map(db.convertDocToObj),
    },
  };
}