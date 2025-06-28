import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { id } from "date-fns/locale";
import { format } from "date-fns/format";
import { Edit2, Trash2 } from "lucide-react";

import { Link } from "react-router-dom";
import OrderDetailDialog from "./OrderDetailDialog";

const OrderList = ({ orders, getTotalOrder, handleDeleteOrder }) => {
  return (
    <Table>
      {orders.length === 0 && (
        <TableRow>
          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
            <span className="italic">No orders found.</span>
          </TableCell>
        </TableRow>
      )}

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
          <TableRow className="hover:bg-muted transition" key={order.orderId}>
            <TableCell className="font-medium text-sm font-bold">
              {order.orderId}
            </TableCell>
            <TableCell className="text-sm text-gray-600">
              {format(new Date(order.date), "d MMMM yyyy", { locale: id })}
            </TableCell>
            <TableCell>
              <OrderDetailDialog order={order} getTotalOrder={getTotalOrder} />
            </TableCell>
            <TableCell>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleDeleteOrder(order.orderId)}
                  type="button"
                  className="cursor-pointer text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 />
                </button>
                <Link
                  to={`/edit/${order.orderId}`}
                  type="button"
                  className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
                >
                  <Edit2 />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderList;
