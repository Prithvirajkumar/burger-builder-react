import React from "react";
import Burger from "../../Burger/Burger";
import Button from "@material-ui/core/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you like it</h1>
      <div className={classes.Burger}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={props.CheckoutCancelled}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={props.CheckoutContinued}
      >
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
