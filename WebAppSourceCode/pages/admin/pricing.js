import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import { AdminDataStore } from '../../utils/admin/AdminDataStore';
import Container from '@mui/material/Container';
import Layout from '../../layouts/Layout/Layout';

const tiers = [
  {
    title: 'Basic',
    price: 599,
    description: [

      '30 Products',
      'No Transaction Charges',
      'Free Hosting',
      'Free SSL',
      '24/7 support',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outlined',
  },

  {
    title: 'Enterprise',
    subheader: 'Most popular',
    price: 2999,
    description: [
      'All Themes & Plugins Free Access',
      'Unlimited Products',
      'No Transaction Charges',
      'Free Hosting',
      'Free SSL',
      '24/7 support',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'contained',
  },
  {
    title: 'Advance',

    price: 6999,
    description: [
      'Unlimited Products',
      'No Transaction Charges',
      'Free Hosting',
      'Free SSL',
      '24/7 support',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outlined',
  },
];

function PricingContent() {
  const { state, dispatch } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!adminStoreInfo) {
        router.push('/admin/login');
    }
}, [router,adminStoreInfo]);


  const makePayment = async (e) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/admin/keys/razorpay", { method: "POST", body: JSON.stringify({ amount: e.price }) }).then((t) =>
      t.json()
    );
    var options = {
      key: 'rzp_test_4qPTbAFC11DvF4', // Enter the Key ID generated from the Dashboard
      name: "Make My Commerce",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "/images/logo.svg",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: adminStoreInfo.name,
        email: adminStoreInfo.email,
        contact: adminStoreInfo.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };










  return (
    <Layout>
      <Container disableGutters maxWidth="sm" component="main" >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Plans
        </Typography>
        {/* <Typography variant="h6" align="center" color="text.secondary" component="p">
          Quickly build an effective pricing table 
        </Typography> */}
      </Container>
      {/* End hero unit */}
      <Container sx={{ mt: 4 }} maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ₹  {tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul style={{ listStyle: 'none' }}>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button onClick={() => makePayment(tier)} fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>


    </Layout>
  );
}

export default function Pricing() {
  return <PricingContent />;
}