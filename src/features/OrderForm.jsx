import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

import DatePicker from "./components/DatePicker";
import AlertSuccess from "./components/AlertSuccess";
import { useNavigate } from "react-router-dom";

const OrderForm = ({
  formData,
  addItem,
  handleSubmit,
  isSuccessOrder,
  handleItemChange,
  handleChangeDate,
  handleDeleteForm,
  isEdit,
}) => {
  const title = isEdit ? "Edit Order" : "Create Order";
  const navigate = useNavigate();
  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {title}
        </h1>
        <div className="flex justify-end">
          <Button variant="default" className="gap-2" onClick={addItem}>
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Order Date
            </label>
            <DatePicker
              isEdit={isEdit}
              setDate={handleChangeDate}
              date={formData?.date}
            />
          </div>
          <div className="space-y-6">
            {formData?.items.map((item, index) => (
              <div
                key={index}
                className="grid md:grid-cols-5 grid-cols-1 gap-4 items-end border border-gray-200 rounded-md p-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={item.name}
                    placeholder="Item name"
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                  />
                  {item.error?.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {item.error?.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="qty"
                    className="text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <Input
                    id="qty"
                    type="number"
                    value={item.qty}
                    placeholder="Qty"
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "qty",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                  {item.error?.qty && (
                    <p className="text-red-500 text-xs mt-1">
                      {item.error?.qty}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <Input
                    id="price"
                    type="number"
                    value={item.price}
                    placeholder="Price"
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                  {item.error?.price && (
                    <p className="text-red-500 text-xs mt-1">
                      {item.error?.price}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Sub Total
                  </label>
                  <Input
                    value={item.price * item.qty}
                    disabled
                    placeholder="Subtotal"
                    className="bg-gray-50"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteForm(index)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete Item"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Submit Order
            </Button>
          </div>
        </form>
        {isSuccessOrder && <AlertSuccess />}
      </div>
    </div>
  );
};

export default OrderForm;
