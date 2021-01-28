import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "@material-ui/core/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger uwith following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: </strong> {props.price.toFixed(2)}
      </p>
      <p>Continue to Checkout?</p>
      <Button
        variant="contained"
        color="secondary"
        onClick={props.purchaseCanceled}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={props.purchaseContinued}
      >
        Continue
      </Button>
    </Aux>
  );
};

export default OrderSummary;
