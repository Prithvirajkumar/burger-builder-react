import React, { useState, useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    bacon: 1,
    cheese: 1,
    meat: 1,
  });

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    setIngredients(ingredients);
  }, []);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        CheckoutCancelled={checkoutCancelledHandler}
        CheckoutContinued={checkoutContinuedHandler}
      ></CheckoutSummary>
    </div>
  );
};

export default Checkout;
