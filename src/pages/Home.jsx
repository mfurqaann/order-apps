import React, { useEffect, useState } from "react";

const Home = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = sessionStorage.getItem("orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <div>
      <p className="text-3xl text-center">Daftar Pesanan</p>
      {orders.length > 0 &&
        orders.map((order) => {
          return <p>{order.date}</p>;
        })}
    </div>
  );
};

export default Home;
