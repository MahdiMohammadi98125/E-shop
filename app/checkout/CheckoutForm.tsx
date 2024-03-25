import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handlePaymentSuccess: (val: boolean) => void;
}

export default function CheckoutForm({
  clientSecret,
  handlePaymentSuccess,
}: CheckoutFormProps) {
  const { cartTotalAmount, handleSetPaymentIntent, handleClearCart } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handlePaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({ elements, redirect: "if_required" })
      .then((result) => {
        if (!result.error) {
          toast.success("Payment successful");
          handleClearCart();
          handlePaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="mb-2 font-semibold">Address information</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["USA"] }}
      />
      <h2 className="mt-4 mb-2 font-semibold">Payment information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-xl font-bold text-center text-slate-700">
        Total: {formattedPrice}
      </div>
      <Button
        label={isLoading ? "Processing..." : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
}
