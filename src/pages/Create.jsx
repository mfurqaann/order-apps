import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import OrderForm from "../features/OrderForm";

const Create = () => {
  const [orders, setOrders] = useState([]);
  const [isSuccessOrder, setIsSuccessOrder] = useState(false);

  function getNextOrderId(orders, prefix = "TRANS") {
    const max = orders.reduce((max, order) => {
      const number = parseInt(order.orderId.match(/\d+$/)?.[0] || "0", 10);
      return number > max ? number : max;
    }, 0);

    return `${prefix}-${max + 1}`;
  }

  useEffect(() => {
    const savedOrders = sessionStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const initialFormState = {
    orderId: "",
    date: new Date(),
    items: [
      {
        name: "",
        qty: 0,
        price: 0,
        total: 0,
        error: {},
      },
    ],
  };
  const [formData, setFormData] = useState(initialFormState);

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { name: "", qty: 1, price: 0, total: 0, error: {} },
      ],
    });
  };

  const addOrder = (order) => {
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
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

  const handleChangeDate = (e) => {
    setFormData((prevValue) => ({ ...prevValue, date: e }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = validation();
    if (validated.isValid) {
      const newOrders = {
        ...validated.updatedFormData,
        orderId: getNextOrderId(orders),
      };
      addOrder(newOrders);
      setIsSuccessOrder(true);
      setFormData(initialFormState);
    } else {
      setFormData(validated.updatedFormData);
      setIsSuccessOrder(false);
    }
  };

  return (
    <div className="p-4">
      <OrderForm
        addItem={addItem}
        formData={formData}
        isSuccessOrder={isSuccessOrder}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleDeleteForm={handleDeleteForm}
        handleChangeDate={handleChangeDate}
        handleItemChange={handleItemChange}
      />
    </div>
  );
};

export default Create;
