import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { getFormatRupiah } from "../utils/getFormatRupiah";

const OrderDetailDialog = ({ order, getTotalOrder }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline" size="sm">
          Show Detail
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-800">
            Order Detail -{" "}
            <span className="text-blue-600">{order.orderId}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Order item details, including quantity and total price
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead className="text-center">Item Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Sub Total</TableHead>
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
                  <TableCell className="text-center">{item.qty}</TableCell>
                  <TableCell className="text-center">
                    {getFormatRupiah(subTotal)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-semibold">
                Total
              </TableCell>
              <TableCell className="text-center font-bold text-green-700">
                {getTotalOrder(order.orderId)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
