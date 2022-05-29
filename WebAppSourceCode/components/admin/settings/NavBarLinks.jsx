import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StoreIcon from '@mui/icons-material/Store';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import TranslateIcon from '@mui/icons-material/Translate';
import StoreDetails from './storeDetails/StoreDetails'
import Checkout from './checkout/Checkout'
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

export default function NavBarLinks() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', height: '100vh',display: { md: 'none', lg: 'flex' } }}
      >
        {/* Laptop */}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >

          <Tab icon={<StoreIcon fontSize="small" />} label="Store Details" />
          <Tab icon={<StoreIcon fontSize="small" />} label="Categories" />
          <Tab icon={<MonetizationOnIcon fontSize="small" />} label="Billing" />
          <Tab icon={<LocalGroceryStoreIcon fontSize="small" />} label="Checkout" />
          <Tab icon={<LocalAtmIcon fontSize="small" />} label="Taxes" />
          <Tab icon={<LocationOnIcon fontSize="small" />} label="Locations" />
          <Tab icon={<CircleNotificationsIcon fontSize="small" />} label="Notifications" />
          <Tab icon={<TranslateIcon fontSize="small" />} label="Languages" />
        </Tabs>

        <Box component={Paper} sx={{width:'100%',px:4}} >
        <TabPanel value={value} index={0}>
          <StoreDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <Categories/> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Checkout />
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
        <TabPanel value={value} index={7}>
          Item Seven
        </TabPanel>
        </Box>
      </Box>


      {/* Mobile */}
      <Box sx={{ display: { md: 'block', lg: 'none' } }} >
        <Tabs centered value={value} onChange={handleChange} aria-label="icon label tabs example">
          <Tab icon={<StoreIcon fontSize="small" />} label="Store Details" />
          <Tab icon={<StoreIcon fontSize="small" />} label="Categories" />
          <Tab icon={<MonetizationOnIcon fontSize="small" />} label="Billing" />
          <Tab icon={<LocalGroceryStoreIcon fontSize="small" />} label="Checkout" />
          <Tab icon={<LocalAtmIcon fontSize="small" />} label="Taxes" />
          <Tab icon={<LocationOnIcon fontSize="small" />} label="Locations" />
          <Tab icon={<CircleNotificationsIcon fontSize="small" />} label="Notifications" />
          <Tab icon={<TranslateIcon fontSize="small" />} label="Languages" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <StoreDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
        {/* <Categories/> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>

    </>
  );
}
