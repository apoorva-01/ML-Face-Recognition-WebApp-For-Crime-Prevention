import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import MoodIcon from '@mui/icons-material/Mood';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CodeIcon from '@mui/icons-material/Code';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  LibraryBooks as LibraryIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";

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
} from "../../../utils/LayoutContext";

const structure = [
  { id: 32, label: "Face Detection", link: "/", icon: <MoodIcon /> },
  { id: 0, label: "Description", link: "/description", icon: <DescriptionIcon /> },
  {
    id: 1,
    label: "Tech Stack",
    link: "/tech-stack",
    icon: <CodeIcon />,
  },
  {
    id: 4,
    label: "How to Run",
    link: "/google-colab",
    icon: <DirectionsRunIcon />,
    children: [
      { label: "Google Colab", link: "/google-colab" },
      { label: "Linux", link: "/linux" },
      { label: "Windows", link: "/windows" },
    ],
  },
  { id: 76, label: "Dataset", link: "/dataset", icon: <StorageIcon /> },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Help", link: "mailto:vermaapoorva0510@gmail.com", icon: <HelpOutlineIcon /> },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "CONTACT" },
  {
    id: 12,
    label: "Resume Website",
    link: "https://apoorva-verma.netlify.app/",
    icon: <LaptopMacIcon/>
  },
  {
    id: 13,
    label: "Github",
    link: "https://github.com/apoorva-01",
    icon: <GitHubIcon/>
  },
  {
    id: 14,
    label: "Linkedin",
    link: "https://www.linkedin.com/in/apoorva-verma-aa045a202/",
    icon: <LinkedInIcon/>,
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
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
