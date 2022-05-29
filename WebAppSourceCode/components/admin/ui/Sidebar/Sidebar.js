import React, { useState, useEffect, useContext } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FilterNone as UIElementsIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import GoogleIcon from '@mui/icons-material/Google';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EmailIcon from '@mui/icons-material/Email';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import SettingsIcon from '@mui/icons-material/Settings';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faChartBar, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import { AdminDataStore } from '../../../../utils/admin/AdminDataStore';
// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../../../utils/admin/LayoutContext";


function Sidebar({ location }) {
  

  const { state } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const structure = [
    { id: 0, label: 'Home', link: '/admin/', icon: <HomeIcon /> },
    // { id: 0, label: 'Explore', link: '/admin/explore-products', icon: <TravelExploreIcon /> },
    {
      id: 1,
      label: 'Products', link: '/admin/products', icon: <FontAwesomeIcon style={{ fontSize: '0.3rem' }} icon={faTags} />,
      children: [
        { label: 'All Products', link: '/admin/products' },
        { label: 'Inventory', link: '/admin/products/inventory' },
        { label: 'Categories', link: '/admin/products/categories' },
      ],
    },

    {
      id: 2,
      label: 'Orders', link: '/admin/orders', icon: <FontAwesomeIcon style={{ fontSize: '0.3rem' }} icon={faCartArrowDown} />,
      // children: [
      //   { label: 'All Orders', link: '/admin/orders' },
      //   { label: 'Drafts', link: '/admin/orders/draft-orders' },
      //   { label: 'Unattended Cart', link: '/admin/orders/unattended-cart' },
      // ],
    },
    {
      id: 3,
      label: 'Analytics', link: '/admin/analytics', icon: <FontAwesomeIcon style={{ fontSize: '0.3rem' }} icon={faChartBar} />,
      // children: [
      //   { label: 'Dashboard', link: '/admin/analytics' },
      //   { label: 'Reports', link: '/admin/analytics/reports' },
      //   { label: 'Live View', link: '/admin/analytics/live' },
      // ],
    },

    { id: 5, type: 'divider' },
    { id: 8, label: 'SEO', link: '/admin/seo', icon: <GoogleIcon /> },
    {
      id: 9,
      label: 'Customers', link: '/admin/customers', icon: <EmailIcon />,
      // children: [
      //   { label: 'Details', link: '/admin/customers' },
      //   { label: 'Email Campaign', link: '/admin/customers/email' },
      // ],
    },
    { id: 98, label: 'Payment', link: '/admin/settings/payment-provider', icon: <CurrencyRupeeIcon /> },
    {
      id: 23, label: 'Settings', link: '/admin/settings', icon: <SettingsIcon />,
      children: [
        { label: 'Store Details', link: '/admin/settings' },
        { label: 'Address', link: '/admin/settings/address' },
        { label: 'Shipping', link: '/admin/shipping' },
        { label: 'Checkout', link: '/admin/settings/checkout' },
        { label: 'Billing', link: '/admin/settings/billing' },
        { label: 'Taxes', link: '/admin/settings/taxes' },
        // { label: 'Locations', link: '/admin/settings/locations' },
        // { label: 'Languages', link: '/admin/settings/languages' },
        { label: 'Policies', link: '/admin/settings/policies' },
      ],
    },



    { id: 6, type: 'title', label: 'ONLINE STORE' },
    { id: 29, label: 'View Online Store', link: `${adminStoreInfo?adminStoreInfo.storeLink:'/'}`, icon: <StoreMallDirectoryIcon /> },
    { id: 10, type: 'divider' },
    { id: 11, type: 'title', label: 'Billing' },
    { id: 12, label: 'Plans', link: '/admin/pricing', icon: <Dot size="small" color="secondary" /> },
    // { id: 13, label: 'Starred', link: '', icon: <Dot size="small" color="primary" /> },
  ];


  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default Sidebar;
