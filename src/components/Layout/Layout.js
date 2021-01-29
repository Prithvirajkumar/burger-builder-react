import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [state, setState] = useState({
    showSideDrawer: false,
  });

  const sideDrawerClosedHandler = () => {
    setState({
      showSideDrawer: false,
    });
  };

  const sideDrawerOpenedHandler = () => {
    setState({
      showSideDrawer: true,
    });
  };

  return (
    <Aux>
      <Toolbar DrawerToggleClicked={sideDrawerOpenedHandler}></Toolbar>
      <SideDrawer
        open={state.showSideDrawer}
        closed={sideDrawerClosedHandler}
      ></SideDrawer>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
