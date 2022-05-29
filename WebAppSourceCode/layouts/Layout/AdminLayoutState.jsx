import React, { useContext, useEffect } from "react";
import { useLayoutState } from "../../utils/admin/LayoutContext";
import { AdminDataStore } from '../../utils/admin/AdminDataStore';
import classnames from "classnames";

// import { Box, IconButton, Link } from '@material-ui/core'
// import LinearProgressComponent from './LinearProgressComponent'
// import Icon from '@mui/material/Icon';
//icons
// import {
//   FacebookIcon,
//   TwitterIcon,
//   GithubIcon,
// } from '@mui/icons-material'
// styles
import useStyles from "./styles";

// components
import Header from "../../components/admin/ui/Header";
import Sidebar from "../../components/admin/ui/Sidebar";
// context

import { useRouter } from 'next/router';
export default function AdminLayoutState(props) {
  const { state } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;

  const router = useRouter();
  // useEffect(() => {
  //   if (!adminStoreInfo) {
  //     router.push('/admin/login');
  //   }
  // }, []);
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();




  return (<>
    {/* <LinearProgressComponent /> */}
    <div sx={{ backgroundColor: '#F6F6F7' }} className={classes.root}>
        <Header />
        <Sidebar />
        <div

          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          {props.children}
          {/* <Box
            mt={5}
            width={"100%"}
            display={"flex"}
          >
            <div>
              <Link
                href={'https://www.facebook.com/'}
                target={'_blank'}
              >
                <IconButton aria-label="facebook">
                  <Icon
                    path={FacebookIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://twitter.com/'}
                target={'_blank'}
              >
                <IconButton aria-label="twitter">
                  <Icon
                    path={TwitterIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://github.com/'}
                target={'_blank'}
              >
                <IconButton
                  aria-label="github"
                  style={{ marginRight: -12 }}
                >
                  <Icon
                    path={GithubIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
            </div>
          </Box> */}
        </div>
    </div>
  </>);
}
