import { useEffect, useState } from "react";
import OrderForm from "../features/OrderForm";
import { validateForm } from "../utils/validation";
import { addOrderToSessionStorage } from "../utils/ordersStorage";

const Create = () => {
  const [orders, setOrders] = useState([]);
  const [isSuccessOrder, setIsSuccessOrder] = useState(false);

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
        id: "",
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
        { id: "1", name: "", qty: 1, price: 0, total: 0, error: {} },
      ],
    });
  };

  function getNextOrderId(orders, prefix = "TRANS") {
    const max = orders.reduce((max, order) => {
      const number = parseInt(order.orderId.match(/\d+$/)?.[0] || "0", 10);
      return number > max ? number : max;
    }, 0);

    return `${prefix}-${max + 1}`;
  }

  const handleDeleteForm = (id) => {
    if (formData.items.length == 1) {
      return;
    }
    setFormData((prevValue) => ({
      ...prevValue,
      items: prevValue.items.filter((item, index) => index !== id),
    }));
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
    const { isValid, updatedFormData } = validateForm(formData);
    if (isValid) {
      const itemsWithId = updatedFormData.items.map((item, index) => ({
        ...item,
        id: String(index + 1),
      }));

      const newOrders = {
        ...updatedFormData,
        orderId: getNextOrderId(orders),
        items: itemsWithId,
      };
      addOrderToSessionStorage(orders, newOrders, setOrders);
      setIsSuccessOrder(true);
      setFormData(initialFormState);
    } else {
      setFormData(updatedFormData);
      setIsSuccessOrder(false);
    }
  };

  return (
    <div>
      <OrderForm
        isEdit={false}
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
