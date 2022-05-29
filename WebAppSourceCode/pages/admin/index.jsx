import React, { useState, useContext, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Hero from "../../components/admin/home/Hero";
import styles from "../../styles/admin/device-mockup.module.css";
import Layout from '../../layouts/Layout/Layout';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import { AdminDataStore } from '../../utils/admin/AdminDataStore';
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import LaptopIcon from "@mui/icons-material/Laptop";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSnackbar } from 'notistack';
export default function HomePage() {
  const router = useRouter();
  const { state, dispatch } = useContext(AdminDataStore);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { adminStoreInfo } = state;
  useEffect(() => {
    if (!adminStoreInfo) {
        router.push('/admin/login');
    }
}, [router,adminStoreInfo]);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [devices, setDevices] = useState("phone");
  const handleDevices = (deviceName) => {
    setDevices(deviceName);
  };


  return (
    <>
      <Layout>
        <Grid container>
          <Grid item s={12} lg={8} md={6}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1 }}>
                <TabList onChange={handleChange} centered>
                  <Tab label="Links" value="1" />
                  {/* <Tab label="Design" value="2" /> */}
                </TabList>
              </Box>
              <TabPanel value="1">
                {/* Links Tab Content */}
                <Container sx={{ my: 4 }}>
                  <Hero />
                  <ChakraProvider>
                    <Link href='/admin/add-products'>
                      <a>
                        <Button
                          className="hvr-grow"
                          style={{
                            width: "100%",
                            backgroundColor: "#008060",
                            color: "white",
                            marginTop: "1rem",
                          }}
                          size="lg">
                          Add Products
                        </Button>
                      </a>
                    </Link>
                  </ChakraProvider>
                </Container>
              </TabPanel>
              {/* <TabPanel value="2">
                <Grid container spacing={2}>
               
                  <Grid item xs={4}>
                    <Image alt='Theme' onClick={()=>setDemoTheme('https://aaaaa-nu.vercel.app/')} width={170} height={300} src={'/admin/images/themes/0.jpg'}></Image>
                  </Grid>
               
                  <Grid item xs={4}>
                    <Image alt='Theme' onClick={()=>setDemoTheme('https://1-make-my-commerce.netlify.app/')} width={170} height={300} src={'/admin/images/themes/1.jpg'}></Image>
                  </Grid>
                     
                  <Grid item xs={4}>
                  <Image alt='Theme' onClick={()=>setDemoTheme('https://6-make-my-commerce.netlify.app/')} width={170} height={300} src={'/admin/images/themes/6.jpg'}></Image>
                  </Grid>
                  <Grid item xs={4}>
                  <Image alt='Theme' onClick={()=>setDemoTheme('https://makeup-mmc.netlify.app/')} width={170} height={300} src={'/admin/images/themes/5.jpg'}></Image>
                  </Grid>
                  <Grid item xs={4}>
                  <Image alt='Theme' onClick={()=>setDemoTheme('https://2-make-my-commerce.netlify.app/')} width={170} height={300} src={'/admin/images/themes/2.jpg'}></Image>
                  </Grid>
                  <Grid item xs={4}>
                  <Image alt='Theme' onClick={()=>setDemoTheme('https://3-make-my-commerce.netlify.app/')} width={170} height={300} src={'/admin/images/themes/3.jpg'}></Image>
                  </Grid>
              
                  <Grid item xs={4}>
                  <Image alt='Theme' onClick={()=>setDemoTheme('https://4-make-my-commerce.netlify.app/')} width={170} height={300} src={'/admin/images/themes/4.jpg'}></Image>
                  </Grid>
              
         
           
              
                </Grid>
                <Paper elevation={2}>
                  <Container sx={{ p: 3 }} maxWidth="sm">
                    <Stack
                      sx={{ pt: 2 }}
                      direction="column"
                      spacing={2}
                    >
                      <ChakraProvider>

                        <Link href='/admin/editor'>
                          a<a>
                          <Button style={{ color: '#008060' }} variant="outline">
                            Try Now
                          </Button>
                          </a>
                        </Link>
                      </ChakraProvider>
                    </Stack>
                  </Container>
                </Paper>
              </TabPanel> */}
            </TabContext>
          </Grid>

          <Grid item s={12} lg={4} md={6}>
            <Container
              container
              className="text-center lg:w-2/3 w-full"
            >
              {adminStoreInfo ? (
                <Typography align="center" component="p" fontWeight={400}>
                  Your Online Store : &nbsp;
                  <a
                    target="_blank"  rel="noreferrer"
                    href={`${adminStoreInfo?.storeLink}`}
                  >{`${adminStoreInfo?.storeLink}`}</a>
                </Typography>
              ) : (<></>)}



              {/* <ToggleButtonGroup aria-label="device">
                <ToggleButton onClick={() => handleDevices("phone")} value="">
                  <PhoneAndroidIcon />
                </ToggleButton>

                <ToggleButton onClick={() => handleDevices("laptop")} value="">
                  <LaptopIcon />
                </ToggleButton>
              </ToggleButtonGroup> */}


            </Container>
            <section
              className={styles["phone-container"]}
              style={{
                marginTop: "8rem"
              }}
            >
              {/* Phone */}
              {devices === "phone" ? (
                <div className={styles["preview"]}>
                  <div
                    className={styles["preview-wrap"]}
                    style={{
                      transform: `scale(0.655601) translateX(-50%) translateY(-50%) translate3d(0px, 0px, 0px)`
                    }}>
                    <div
                      // style={{ backgroundColor: bgColor }}
                      className={styles["preview-inner"]}>
                      <iframe width="100%" height="100%" src={adminStoreInfo?.storeLink} title="W3Schools Free Online Web Tutorials"></iframe>
                      <div className={styles["preview-area"]}>
                        <div height="100%" width="100%">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

            </section>


            {/* Laptop */}
            {/* <section className={styles["laptop-container"]} >
              {devices === "laptop" ? (
                <div className={styles["preview-laptop"]}>
                  <div
                    className={styles["preview-wrap-laptop"]}
                    style={{transform: `scale(0.655601) translateX(-50%) translateY(-50%) translate3d(0px, 0px, 0px)`}}>
                    <div className={styles["preview-inner-laptop"]}>
                      <div height="100%" width="100%">
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </section> */}

          </Grid>
        </Grid>

      </Layout>
    </>
  );
}
