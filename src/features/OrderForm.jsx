import DatePicker from "./components/DatePicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Plus, Trash2 } from "lucide-react";
import AlertSuccess from "./components/AlertSuccess";
import { useEffect } from "react";

const OrderForm = ({
  formData,
  addItem,
  handleSubmit,
  isSuccessOrder,
  setFormData,
  handleItemChange,
  handleChangeDate,
  handleDeleteForm,
}) => {
  if (!formData) return <p>Loading Data...</p>;
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
            {formData?.items.map((item, index) => {
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
                    onClick={() => handleDeleteForm(index)}
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
