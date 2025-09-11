

export default function summary (cartItems) {
    const sum = cartItems.reduce(
    (acc, item) => {
      const priceToUse = item.discont_price ? item.discont_price : item.price;

      acc.totalQuantity += item.quantity;
      acc.totalPrice += priceToUse * item.quantity;

      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 },
  );
  return sum;
}