import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import classes from "./DrawerToggle.module.css";

const DrawerToggle = (props) => (
  <div className={classes.DrawerToggle}>
    <MenuIcon onClick={props.clicked}></MenuIcon>
  </div>
);

export default DrawerToggle;
