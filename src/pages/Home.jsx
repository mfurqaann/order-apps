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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { format } from "date-fns/format";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getFormatRupiah } from "../utils/FormatRupiah";

const Home = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = sessionStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
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
    <div className="relative w-full mx-auto min-h-[600px] max-w-4xl bg-white rounded-xl shadow-lg p-6">
      <p className="text-3xl text-center font-bold mb-3">Order List</p>

      <Link to={"/create"}>
        <Button
          variant="outline"
          id="date"
          className="mb-5 justify-between font-normal"
        >
          <Plus />
          Add Order
        </Button>
      </Link>
      <Table>
        {orders.length === 0 && <TableCaption>No Orders Found</TableCaption>}

        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Detail Order</TableHead>
            <TableHead>Action</TableHead>
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
                <Dialog>
                  <DialogTrigger>
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="sm"
                    >
                      Show Detail
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Title</DialogTitle>
                      <DialogDescription>Description</DialogDescription>
                    </DialogHeader>
                    <Table>
                      <TableCaption>
                        A list of your recent invoices.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Item</TableHead>
                          <TableHead className="text-center">
                            Harga Item
                          </TableHead>
                          <TableHead className="text-center">
                            Jumlah Item
                          </TableHead>
                          <TableHead className="text-center">
                            Sub Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map((item, index) => {
                          const subTotal = item.qty * item.price;
                          return (
                            <TableRow key={index}>
                              <TableCell key={index}>
                                <strong>{item.name}</strong>
                              </TableCell>
                              <TableCell className="text-center">
                                {getFormatRupiah(item.price)}
                              </TableCell>
                              <TableCell className="text-center">
                                {item.qty}
                              </TableCell>
                              <TableCell className="text-center">
                                {getFormatRupiah(subTotal)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={3}>Total</TableCell>
                          <TableCell className="text-center">
                            {getTotalOrder(order.orderId)}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDeleteOrder(order.orderId)}
                    type="button"
                    className="cursor-pointer"
                  >
                    <Trash2 />
                  </button>
                  <Link
                    to={`/edit/${order.orderId}`}
                    type="button"
                    className="cursor-pointer"
                  >
                    <Edit2 />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
