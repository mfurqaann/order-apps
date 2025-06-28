export const getFormatRupiah = (value) => {
  const strValue = String(value);
  const number = parseInt(strValue.replace(/[^\d]/g, ""), 10);
  if (isNaN(number)) return "";
  return "Rp " + number.toLocaleString("id-ID");
};
