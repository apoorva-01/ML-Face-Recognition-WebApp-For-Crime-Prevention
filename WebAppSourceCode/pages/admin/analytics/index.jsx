import React, { useContext, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../../layouts/Layout/Layout';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useTheme } from "@material-ui/styles";
import axios from 'axios';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import Stack from "@mui/material/Stack";
import { useRouter } from 'next/router';
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import { Animation } from '@devexpress/dx-react-chart';
import ChartComponent from './chart'
import { confidence as data } from '../../../components/data-vizualization';
export default function Sales({ totalOrders, totalDeliveredOrders, totalRevenue, totalShippingPrice }) {
  const { state, dispatch } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const router = useRouter();
  var theme = useTheme();

  useEffect(() => {
    if (!adminStoreInfo) {
        router.push('/admin/login');
    }
}, [router,adminStoreInfo]);
  
  return (
    <Layout>

      <Grid container>
        <Grid component={Paper} item sm={6} md={4} lg={2.8} sx={{ p: 3, m: 1 }}>
          <Stack direction="row">
            <Typography variant="h6" color="text.secondary">
              Total Sales
            </Typography>

            <Tooltip title="Your Total Earnings" placement="top" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
      

          </Stack>
          <Typography component="p" variant="h4">
            $  {totalRevenue}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Till {`${new Date().toLocaleDateString()}`}
          </Typography>
<ChartComponent/>
        </Grid>
        <Grid component={Paper} item sm={6} md={4} lg={2.8} sx={{ p: 3, m: 1 }}>
          <Stack direction="row">
            <Typography variant="h6" color="text.secondary">
              Purchases
            </Typography>
            <Tooltip title="Total number of Orders Placed" placement="top" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography component="p" variant="h4">
            {totalOrders}  Orders
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Till {`${new Date().toLocaleDateString()}`}
          </Typography>
        </Grid>
        <Grid component={Paper} item sm={6} md={4} lg={2.8} sx={{ p: 3, m: 1 }}>
          <Stack direction="row">
            <Typography variant="h6" color="text.secondary">
              Visits
            </Typography>
            <Tooltip title="Total Unique Store Visitor" placement="top" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography component="p" variant="h4">
            200 Users
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Till {`${new Date().toLocaleDateString()}`}
          </Typography>
        </Grid>

        <Grid component={Paper} item sm={6} md={4} lg={2.8} sx={{ p: 3, m: 1 }}>
          <Stack direction="row">
            <Typography variant="h6" color="text.secondary">
              Conversions
            </Typography>
            <Tooltip title="Percentage of users who have placed orders " placement="top" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography component="p" variant="h4">
            34%
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Till {`${new Date().toLocaleDateString()}`}
          </Typography>
        </Grid>


        <Grid component={Paper} item sm={6} md={4} lg={2.8} sx={{ p: 3, m: 1 }}>
          <Stack direction="row">
            <Typography variant="h6" color="text.secondary">
              Customer Through Referral
            </Typography>
            <Tooltip title="Percentage of customers that have placed more than one order from your Store " placement="top" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography component="p" variant="h4">
            14%
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Till {`${new Date().toLocaleDateString()}`}
          </Typography>
        </Grid>


        <Grid component={Paper} item sm={6} md={4} lg={2.8} sx={{ p: 3, m: 1 }}>
          <Stack direction="row">
            <Typography variant="h6" color="text.secondary">
              Avearge Order Value
            </Typography>
            <Tooltip title="Total Value of All Orders (including,taxts,shipping,referral and discounts) devided by total number of orders" placement="top" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography component="p" variant="h4">
            $  14
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Till {`${new Date().toLocaleDateString()}`}
          </Typography>
        </Grid>
        <Grid component={Paper} item sm={6} md={4} lg={2.8} sx={{ p: 3, m: 1 }}>
          <Stack direction="row">
            <Typography variant="h6" color="text.secondary">
              Customer Return Rate
            </Typography>
            <Tooltip title="Total Value of All Orders (including,taxts,shipping,referral and discounts) devided by total number of orders" placement="top" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography component="p" variant="h4">
            16 %
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Till {`${new Date().toLocaleDateString()}`}
          </Typography>
        </Grid>
        <Grid component={Paper} item sm={6} md={4} lg={2.8} sx={{ p: 3, m: 1 }}>
          <Stack direction="row">
            <Typography variant="h6" color="text.secondary">
              Total Cost
            </Typography>
            <Tooltip title="Total Value of All Orders (including,taxts,shipping,referral and discounts) devided by total number of orders" placement="top" arrow>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography component="p" variant="h4">
            $ 30
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Till {`${new Date().toLocaleDateString()}`}
          </Typography>
        </Grid>

      </Grid>
    </Layout>

  )
}


export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  const { cookies } = req
  // get the current environment
  let dev = true;
  let { DEV_URL, PROD_URL } = process.env;

  const { data } = await axios.post(`${dev ? DEV_URL : PROD_URL}/api/admin/analytics`, {
    storeID: process.env.STORE_OBJECT_ID,
  })

  return {
    props: {

      totalOrders: data.totalOrders,
      totalDeliveredOrders: data.totalDeliveredOrders,
      totalRevenue: data.totalRevenue,
      totalShippingPrice: data.totalShippingPrice,
    },
  };
}





// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
