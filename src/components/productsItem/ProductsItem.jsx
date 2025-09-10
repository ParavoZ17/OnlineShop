import { useState } from "react";

export default function ProductItem({ title, price }) {
  const [count, setCount] = useState(1);

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div>
      <h2>{title}</h2>
      <button>X</button>
      </div>

      
      <div>
        <button onClick={handleDecrease}>-</button>
        <span>{count}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <span>{price} €</span>
    </div>
  );
}

