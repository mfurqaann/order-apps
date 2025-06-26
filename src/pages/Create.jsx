import React, { useEffect, useState } from "react";
import OrderForm from "../features/OrderForm";

const Create = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = sessionStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const addOrder = (order) => {
    const updatedOrders = [...orders, order];
    setOrders([...orders, order]);
    sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const deleteOrder = (index) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
  };

  return (
    <div className="p-4">
      <OrderForm onAdd={addOrder} />
    </div>
  );
};

export default Create;
