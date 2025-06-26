import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import OrderForm from "../features/OrderForm";

const Edit = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const initialFormState = {
    orderId: "",
    date: undefined,
    items: [
      {
        name: "",
        qty: 1,
        price: 1,
        total: 1,
        error: {},
      },
    ],
  };

  const [formData, setFormData] = useState(null);
  const [isSuccessOrder, setIsSuccessOrder] = useState(false);

  useEffect(() => {
    if (!id) return; // atau cek tipe data id\
    const savedOrders = sessionStorage.getItem("orders");
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);

      const selectedOrders = orders.find((order) => order.orderId == id);
      if (selectedOrders) {
        setFormData(selectedOrders);
      }
    }
  }, [id]);

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

  const addOrder = (order) => {
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

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
    const validated = validation();
    if (validated.isValid) {
      const newOrders = { ...validated.updatedFormData, orderId: uuidv4() };
      addOrder(newOrders);
      setIsSuccessOrder(true);
      setFormData(initialFormState);
    } else {
      setFormData(validated.updatedFormData);
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
      />
    </div>
  );
};

export default Edit;
