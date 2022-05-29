import * as React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={2}>
      <Box
        sx={{ display: 'flex', height: '100%', py: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }} >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'divider', width: '16rem' }}
        >
          <Tab label="Add Product" {...a11yProps(0)} />
          <Tab label="Customize" {...a11yProps(1)} />
          <Tab label="Set up Shipping" {...a11yProps(2)} />
          <Tab label="Activate Checkout" {...a11yProps(3)} />
          <Tab label="Marketing" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Add Product
            </Typography>
            <Typography
              align="center"
            >
              Add your First Product
              Pick your product type, write an awesome description and <b>Sell It!</b>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link href='/admin/add-product'>
                <a>
                  <Button variant="contained">Add Product</Button>  
                  </a>
              </Link>
              {/* <Link href='/admin/explore-products'>
                <a>
                  <Button variant="outlined">Explore Products to Sell</Button>  
                  </a>
              </Link> */}
            </Stack>
          </Container>
        </TabPanel>



        <TabPanel value={value} index={1}>

          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Customize
            </Typography>
            <Typography
              align="center"
            >
              Edit the look and feel of your Online Store

            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </TabPanel>


        <TabPanel value={value} index={2}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
             Shipping Rates and Delivery Methods


            </Typography>    <Typography
              align="center"
            >
            Decide how you want to deliver your products to customers.
            </Typography>  <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Link href='/admin/shipping'>
                <a>
              <Button variant="contained">Automate Your Shipping</Button>
              </a>
              </Link>
            </Stack>
          </Container>
        </TabPanel>


        <TabPanel value={value} index={3}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Payment Method
            </Typography>    <Typography
              align="center"
            >
              Add a payment gateway to activate checkout for your store and receive instant payout when you make a sale.
            </Typography>  <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                <Link href='/admin/settings/payment-provider'>
                <a>
              <Button variant="contained">Add Payment Provider</Button>
              </a>
              </Link>
            </Stack>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Marketing
            </Typography>    <Typography
              align="center"
            >
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet. </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
            </Stack>
          </Container>
        </TabPanel>
      </Box>
    </Paper>
  );
}
