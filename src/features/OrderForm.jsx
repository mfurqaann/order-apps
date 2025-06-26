import { useState } from "react";
import DatePicker from "./components/DatePicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { CheckCircle2Icon, Plus, SquarePlus, Trash2 } from "lucide-react";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import AlertSuccess from "./components/AlertSuccess";

const OrderForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    orderId: "",
    date: new Date(),
    items: [
      {
        name: "",
        qty: 1,
        price: 1,
        total: 1,
        error: {},
      },
    ],
  });
  const [isSuccessOrder, setIsSuccessOrder] = useState(false);

  const addItem = (e) => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { name: "", qty: 1, price: 0, total: 0, error: {} },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = validation();
    if (validated.isValid) {
      const orderWithId = { ...validated.updatedFormData, orderId: uuidv4() };
      setFormData(orderWithId);
      onAdd(orderWithId);
      setIsSuccessOrder(true);
      setFormData({
        orderId: "",
        date: new Date(),
        items: [
          {
            name: "",
            qty: 1,
            price: 1,
            total: 1,
            error: {},
          },
        ],
      });
    } else {
      setFormData(validated.updatedFormData);
      setIsSuccessOrder(false);
    }
  };

  const handleDelete = (id) => {
    if (formData.items.length == 1) {
      return;
    }
    setFormData((prevValue) => ({
      ...prevValue,
      items: prevValue.items.filter((item, index) => index !== id),
    }));
  };

  const validation = () => {
    let isValid = true;

    const newItems = formData.items.map((data) => {
      const error = {};
      if (!data.name.trim()) {
        error.name = "Name must not be empty";
        isValid = false;
      }

      if (!data.qty || data.qty <= 0) {
        error.qty = "Quantity must be greater than zero";
        isValid = false;
      }

      if (!data.price || data.price <= 0) {
        error.price = "Price must be greater than zero";
        isValid = false;
      }

      return { ...data, error };
    });
    const updatedFormData = { ...formData, items: newItems };
    return { isValid, updatedFormData };
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;

    if (field === "qty" || field === "price") {
      const qty = parseInt(updatedItems[index].qty) || 0;
      const price = parseFloat(updatedItems[index].price) || 0;
      updatedItems[index].total = qty * price;
    }
    setFormData({ ...formData, items: updatedItems });
  };

  const handleChangeDate = (e) => {
    setFormData((prevValue) => ({ ...prevValue, date: e }));
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full min-h-[600px] max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl text-center font-bold">Form Order</h1>

        <Button
          variant="outline"
          id="date"
          className="mt-10 justify-between font-normal"
          onClick={addItem}
        >
          <Plus />
          Add Item
        </Button>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div>
            <DatePicker setDate={handleChangeDate} date={formData.date} />
          </div>
          <div>
            {formData.items.map((item, index) => {
              return (
                <div className="flex gap-3 mt-5" key={index}>
                  <div className="w-full">
                    <Input
                      type="text"
                      name="name"
                      value={item.name}
                      className="block"
                      placeholder="Name"
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                    {item.error?.name && (
                      <p className="text-red-400 font-medium">
                        {item.error?.name}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      name="qty"
                      value={item.qty}
                      placeholder="qty"
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "qty",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />

                    {item.error?.qty && (
                      <p className="text-red-400 font-medium">
                        {item.error?.qty}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      name="price"
                      value={item.price}
                      placeholder="price"
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                    {item.error?.price && (
                      <p className="text-red-400 font-medium">
                        {item.error?.price}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 />
                  </button>
                </div>
              );
            })}
          </div>
          <Button variant="outline" className="mt-5">
            Submit Order
          </Button>
        </form>
        {isSuccessOrder && <AlertSuccess />}
      </div>
    </div>
  );
};

export default OrderForm;
