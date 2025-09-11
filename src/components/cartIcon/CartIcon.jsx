import { Badge } from "@mui/material";

import { useSelector } from "react-redux";
import basket from "../../assets/icons/basket.svg";

export default function CartIcon() {
  const cartItems = useSelector((state) => state.basket.items);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Badge
      badgeContent={totalQuantity}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: "#0D50FF",
          color: "#fff",
          fontSize: "0.75rem",
          minWidth: "20px",
          height: "20px",
          borderRadius: "50%",
          top: 15,
          left: 10,
        },
      }}
    >
      <img src={basket} alt="basket" style={{ width: 40, height: 40 }} />
    </Badge>
  );
}
