import React from "react";
import Layout from "../../Layout/Layout";
import Grid from "@mui/material/Grid";
import Image from 'next/image'
import Typography from "@mui/material/Typography";
function Datset() {
  return (
    <Layout>
      <Grid container>

        <Grid item xs={6}>
          <Image src="/architecture.png" width="500" height="400"/>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: '2rem' }} variant="p">Face Recognition for Preventing Crime</Typography><br />
          <Typography sx={{ fontSize: '1rem' }} variant="p">Facial recognition technology has the potential to help conduct faster investigations, bring offenders to justice and, thus, resolve, stop and prevent crimes.<br />
            <br />
            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }} variant="p">Features<br /></Typography>
            <ul>
              <li>Application can detect face in <b>less than 3 sec with 90%+ accuracy</b>.<br /></li>
              <li>Any person with <b>98%+ accuracy recognition will automatically mail all the concerned authorities</b> for preventing crime</li>
              <li>Can detect real-time by <b> changing video input to CCTV Camera  </b> from WebCam</li>
              <li><b>Real Time</b> Face Detection</li>
              <li>Model Training Code is <b>Cross Platform</b></li>
              <li>Secured API Design</li>
              <li><b>Deployed </b>on Digital Ocean</li>
              <li>User Management Enabled</li>
            </ul>

          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Datset;
