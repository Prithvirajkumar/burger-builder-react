import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });
  const [price, setTotalPrice] = useState();

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    setIngredients(ingredients);
    setTotalPrice(price);
    return () => {};
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
      <Route path={props.match.path + "/contact-data"}>
        <ContactData ingredients={ingredients} price={price}></ContactData>
      </Route>
    </div>
  );
};

export default Checkout;
