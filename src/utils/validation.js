export const validateForm = (formData) => {
    let isValid = true;

    const newItems = formData.items.map((data) => {
        const error = {};
        if (!data.name.trim()) {
            error.name = "Name must not be empty";
            isValid = false;
        }
        if (typeof data.name !== "string" || !/^[A-Za-z\s]+$/.test(data.name.trim())) {
            error.name = "Name should only contain letters and spaces";
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