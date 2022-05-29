import React, { useContext, useEffect } from "react";
import classnames from "classnames";
// styles
import useStyles from "./styles";
// components
import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
// context
import { useLayoutState } from "../utils/LayoutContext";
import { DataStore } from '../utils/DataStore';
import { useRouter } from 'next/router';

function Layout(props) {
  const { state } = useContext(DataStore);
  const { userInfo } = state;

  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, []);
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();


  return (
    <div  sx={{ backgroundColor: '#F6F6F7' }} className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
         
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          {props.children}
         
        </div>
      </>
    </div>
  );
}

export default Layout;
