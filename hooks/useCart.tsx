import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleQuantityDecrease: (product: CartProductType) => void;
  handleQuantityIncrease: (product: CartProductType) => void;
  handleClearCart: (showMsg?: boolean) => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const cartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { qty, total } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            qty: 0,
            total: 0,
          }
        );
        setCartTotalAmount(total);
        setCartTotalQty(qty);
      }
    };
    getTotal();
  }, [cartProducts]);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const cPaymentIntent: string | null = JSON.parse(eShopPaymentIntent);
    setCartProducts(cProducts);
    setPaymentIntent(cPaymentIntent);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedProduct;
      if (prev) {
        updatedProduct = [...prev, product];
      } else {
        updatedProduct = [product];
      }
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedProduct));
      return updatedProduct;
    });
    toast.success("Product added to cart");
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (product) {
        const filteredProduct = (cartProducts || [])?.filter(
          (item) => item?.id !== product.id
        );
        setCartProducts(filteredProduct);
        toast.success("Product removed from cart");
        localStorage.setItem("eShopCartItems", JSON.stringify(filteredProduct));
      }
    },
    [cartProducts]
  );

  const handleQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        toast.error("Oops! maximum quantity is reached");
        return;
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        toast.error("Oops! minimum quantity is reached");
        return;
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  // Remove from cart
  const handleClearCart = useCallback((showMsg?: boolean) => {
    setCartProducts(null);
    localStorage.removeItem("eShopCartItems");
    showMsg && toast.success("Cart cleared");
    setCartTotalQty(0);
  }, []);

  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
  }, []);

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart: handleAddProductToCart,
    handleRemoveProductFromCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleClearCart,
    cartTotalAmount,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <cartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
