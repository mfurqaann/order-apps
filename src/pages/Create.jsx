import React, { useEffect, useState } from "react";
import OrderForm from "../features/OrderForm";

const Create = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const deleteOrder = (index) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl texct-center">Create Order</h1>
      <OrderForm onAdd={addOrder} />
      {/* <OrderList orders={orders} onDelete={deleteOrder} /> */}
    </div>
  );
};

export default Create;
