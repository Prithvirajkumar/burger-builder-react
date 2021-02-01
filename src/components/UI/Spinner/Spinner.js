import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./Spinner.module.css";

const Spinner = () => (
  <div className={classes.Center}>
    <CircularProgress />
  </div>
);

export default Spinner;
