import React,{useContext,useEffect} from 'react'
import Layout from "../../../layouts/Layout/Layout";
import Grid from '@mui/material/Grid';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import { useRouter } from 'next/router';
export default function Profile() {
    const { state } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const router = useRouter();
    useEffect(() => {
      if (!adminStoreInfo) {
          router.push('/admin/login');
      }
  }, [router,adminStoreInfo]);
  return (

        <Layout>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={8} lg={6}>
                <Container container justify="center" align="center">
                  <Avatar
                    style={{ cursor: 'pointer' }}
                    sx={{ bgcolor: "#999999", width: 240, height: 240 }}
                    // alt={adminStoreInfo.name}
                    // src={`${adminStoreInfo.pic}`}
                    // onClick={handleClickOpenChoosePic}
                  />   
                  <Button>Profile Details</Button>
                </Container>
              </Grid>
              <Grid item xs={12} md={4} lg={6}>
              </Grid>
            </Grid>
          </Container>
          {/* All Dialoges */}
          {/* <AddPic />
          <ContactInfo /> */}
        </Layout>
      
  )
}
