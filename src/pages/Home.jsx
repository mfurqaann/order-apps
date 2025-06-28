import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getFormatRupiah } from "../utils/getFormatRupiah";
import { getOrdersFromSessionStorage } from "../utils/ordersStorage";
import OrderList from "../features/OrderList";

const Home = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = getOrdersFromSessionStorage();
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
    }
  }, []);

  const handleDeleteOrder = (id) => {
    console.log(id);
    const newOrders = orders.filter((order) => order.orderId !== id);
    setOrders(newOrders);

    sessionStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const getTotalOrder = (orderId) => {
    const order = orders.find((o) => o.orderId === orderId);
    const total = order.items.reduce((sum, item) => sum + item.total, 0);

    return getFormatRupiah(total);
  };

  return (
    <div className="relative w-full mx-auto min-h-[600px] max-w-5xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order List</h1>
        <Link to="/create">
          <Button variant="default" className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Add Order
          </Button>
        </Link>
      </div>
      <OrderList
        orders={orders}
        getTotalOrder={getTotalOrder}
        handleDeleteOrder={handleDeleteOrder}
      />
    </div>
  );
};

export default Home;
