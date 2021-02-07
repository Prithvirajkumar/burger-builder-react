import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

const ContactData = (props) => {
  const [state, setState] = useState({
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your zipcode",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
  });

  const [loadingState, setLoadingState] = useState({
    loading: false,
  });

  const orderHandler = () => {
    console.log(props.ingredients);
    setLoadingState({
      loading: true,
    });
    const order = {
      ingredients: props.ingredients,
      price: props.price,
    };
    axios
      .post("/orders.json", order)
      .then(
        (response) =>
          setLoadingState({
            loading: false,
          }),
        props.history.push("/")
      )
      .catch((error) =>
        setLoadingState({
          loading: false,
        })
      );
  };

  const formElelmentsArray = [];
  for (let key in state.orderForm) {
    formElelmentsArray.push({
      id: key,
      config: state.orderForm[key],
    });
  }

  let form = (
    <form>
      {formElelmentsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
        ></Input>
      ))}
      <Button variant="contained" color="secondary" onClick={orderHandler}>
        ORDER
      </Button>
    </form>
  );

  if (loadingState.loading) {
    form = <Spinner></Spinner>;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default withRouter(ContactData);
