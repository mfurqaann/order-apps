export const addOrderToSessionStorage = (orders, newOrder, setOrders) => {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
};

export const getOrdersFromSessionStorage = () => {
    const saved = sessionStorage.getItem("orders");

    return saved ? JSON.parse(saved) : [];
};

const saveOrdersToSessionStorage = (orders) => {
    sessionStorage.setItem("orders", JSON.stringify(orders));
};

export const updateOrderInSessionStorage = (updatedOrder) => {
    const orders = getOrdersFromSessionStorage();
    const updatedOrders = orders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
    );
    saveOrdersToSessionStorage(updatedOrders);
};
