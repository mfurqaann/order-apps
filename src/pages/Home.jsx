import React, { useEffect, useState } from "react";
import { id } from "date-fns/locale";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns/format";

const Home = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = sessionStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);
  return (
    <div className="relative w-full mx-auto min-h-[600px] max-w-4xl bg-white rounded-xl shadow-lg p-6">
      <p className="text-3xl text-center font-bold mb-3">Order List</p>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>List of Items</TableHead>
            <TableHead>Total per Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell className="font-medium">{order.orderId}</TableCell>
              <TableCell className="font-medium">
                {format(new Date(order.date), "d MMMM yyyy", { locale: id })}
              </TableCell>
              <TableCell>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      <div>
                        <strong>{item.name}</strong>
                      </div>
                      <div>
                        {item.qty} pcs x {item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="font-medium text-center">
                {order.items.reduce((sum, item) => sum + item.total, 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
};

export default Home;
