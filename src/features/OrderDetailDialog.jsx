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
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Item</TableHead>
              <TableHead className="text-center">Harga Item</TableHead>
              <TableHead className="text-center">Jumlah Item</TableHead>
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
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-center">
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
