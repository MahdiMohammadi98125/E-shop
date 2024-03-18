import { createContext, useContext, useState } from "react";

type CartContextType = {
  cartTotalQty: number;
};

const cartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const value = { cartTotalQty };

  return <cartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (context === undefined || context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
