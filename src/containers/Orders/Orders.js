import React, { useState, useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

const Orders = () => {
  const [orderState, setOrderState] = useState({
    orders: [],
  });

  const [loadingState, setLoadingState] = useState({
    loading: true,
  });

  useEffect(() => {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        setLoadingState({ loading: false });
        setOrderState({ orders: fetchedOrders });
      })
      .catch((err) => {
        setLoadingState({ loading: false });
      });
  }, []);

  return (
    <div>
      {orderState.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        ></Order>
      ))}
    </div>
  );
};

export default Orders;
