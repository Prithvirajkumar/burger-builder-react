import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = (props) => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  const [price, setPrice] = useState({
    totalPrice: 4,
  });

  const [purchasableState, setPurchasableState] = useState({
    purchasable: false,
  });

  const [purchasingState, setPurchasingState] = useState({
    purchasing: false,
  });

  const [loadingState, setLoadingState] = useState({
    loading: false,
  });

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setPurchasableState({ purchasable: sum > 0 });
  };

  const addIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = price.totalPrice;
    const newPrice = oldPrice + priceAddition;
    setPrice({ totalPrice: newPrice });
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = price.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setPrice({ totalPrice: newPrice });
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  };

  const purchaseHandler = () => {
    setPurchasingState({ purchasing: true });
  };

  const purchaseCancelHandler = () => {
    setPurchasingState({ purchasing: false });
  };

  const purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push("price=" + price.totalPrice);
    const queryString = queryParams.join("&");
    props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  const disabledInfo = {
    ...ingredients,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = (
    <OrderSummary
      ingredients={ingredients}
      price={price.totalPrice}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    ></OrderSummary>
  );

  if (loadingState.loading) {
    orderSummary = <Spinner></Spinner>;
  }

  return (
    <Aux>
      <Modal
        show={purchasingState.purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      <Burger ingredients={ingredients}></Burger>
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        ordered={purchaseHandler}
        disabled={disabledInfo}
        purchasable={purchasableState.purchasable}
        price={price.totalPrice}
      ></BuildControls>
    </Aux>
  );
};

export default BurgerBuilder;
