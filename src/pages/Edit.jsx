import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import OrderForm from "../features/OrderForm";
import {
  getOrdersFromSessionStorage,
  updateOrderInSessionStorage,
} from "../utils/ordersStorage";
import { validateForm } from "../utils/validation";

const Edit = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
  const [isSuccessOrder, setIsSuccessOrder] = useState(false);

  useEffect(() => {
    const savedOrders = getOrdersFromSessionStorage();
    if (savedOrders.length > 0) {
      const selectedOrders = savedOrders.find((order) => order.orderId == id);
      if (selectedOrders) {
        setFormData(selectedOrders);
      } else {
        return;
      }
    }
  }, [id]);

  const addItem = () => {
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

    const { isValid, updatedFormData } = validateForm(formData);

    if (isValid) {
      const updatedOrder = updatedFormData;
      updateOrderInSessionStorage(updatedOrder);
      setFormData(updatedOrder);
      setIsSuccessOrder(true);
    } else {
      setFormData(updatedFormData);
      setIsSuccessOrder(false);
    }
  };

  const handleDeleteForm = (id) => {
    if (formData.items.length == 1) {
      return;
    }
    setFormData((prevValue) => ({
      ...prevValue,
      items: prevValue.items.filter((item, index) => index !== id),
    }));
  };

  const handleChangeDate = (e) => {
    setFormData((prevValue) => ({ ...prevValue, date: e }));
  };

  const handleItemChange = (index, field, value) => {
    setIsSuccessOrder(false);

    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;

    if (field === "qty" || field === "price") {
      const qty = parseInt(updatedItems[index].qty) || 0;
      const price = parseFloat(updatedItems[index].price) || 0;
      updatedItems[index].total = qty * price;
    }
    setFormData({ ...formData, items: updatedItems });
  };
  return (
    <div>
      <OrderForm
        addItem={addItem}
        formData={formData}
        isSuccessOrder={isSuccessOrder}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleDeleteForm={handleDeleteForm}
        handleChangeDate={handleChangeDate}
        handleItemChange={handleItemChange}
        isEdit={true}
      />
    </div>
  );
};

export default Edit;
