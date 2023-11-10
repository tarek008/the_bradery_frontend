// PaymentSuccessPage.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { passerCommande } from "../../store/slices/CommandeSlice.js";
import { emptyCart } from "../../store/slices/carteSlice.js";
import { useSelector } from "react-redux";

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.entities.users.userId);
  const cartItems = useSelector((state) => state.entities.cart.items);

  useEffect(() => {
    handleSuccessfulPayment();
  });

  const handleSuccessfulPayment = async () => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      try {
        const orderData = {
          user_id: userId,
          items: cartItems,
        };
        await dispatch(passerCommande(orderData));
        dispatch(emptyCart());
      } catch (error) {
        console.error("Error processing payment success:", error);
      }
    }
  };

  return (
    <div
      style={{
        paddingInline: "200px",
        paddingBottom: "200px",
        paddingTop: "100px",
      }}
    >
      Processing your payment... If you are not redirected,{" "}
      <a href="/Products">click here</a> to return to Products page.
    </div>
  );
};

export default PaymentSuccessPage;
