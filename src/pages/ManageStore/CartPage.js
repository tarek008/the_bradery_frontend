import React from "react";
import { useSelector } from "react-redux";
import {
  removeFromCart,
  addToCart,
  updateItemQuantity,
  emptyCart,
  selectTotal,
} from "../../store/slices/carteSlice";
import { useDispatch } from "react-redux";
import { createCheckoutSession } from "../../store/slices/CommandeSlice";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Box,
  Container,
  CardMedia,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const stripePublicKey = process.env.REACT_APP_STRIPE_KEY;
  const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

  const cartItems = useSelector((state) => state.entities.cart.items);
  const dispatch = useDispatch();

  const removeFromPannier = (item) => {
    dispatch(removeFromCart(item));
  };
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const Total = useSelector(selectTotal);

  const handleQuantityChange = (event, item) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  };
  const userId = useSelector((state) => state.entities.users.userId);

  const ByProducts = async () => {
    const orderData = {
      user_id: userId,
      items: cartItems,
    };
    const stripe = await stripePromise;

    try {
      const checkoutAction = await dispatch(createCheckoutSession(orderData));
      const sessionId = checkoutAction.data.sessionId;

      if (sessionId) {
        const stripeResponse = await stripe.redirectToCheckout({ sessionId });

        if (stripeResponse.error) {
          throw stripeResponse.error;
        }
      } else {
        throw new Error(
          "Session ID not found in the checkout session response."
        );
      }
    } catch (error) {
      console.error("Stripe checkout failed:", error);
    }
  };

  return (
    <Box
      className="h-100 h-custom"
      sx={{
        backgroundColor: "#eee",
        paddingTop: "100px",
        paddingBottom: "228px",
      }}
    >
      <Container className="h-100 py-5">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className="h-100"
        >
          <Grid item xs={12} md={8} lg={6}>
            <Card className="shopping-cart" sx={{ borderRadius: "15px" }}>
              <CardContent>
                <Typography
                  variant="h3"
                  component="h3"
                  mb={5}
                  pt={2}
                  textAlign="center"
                  className="fw-bold text-uppercase"
                >
                  Shopping Cart
                </Typography>
                {cartItems.map((item, key) => (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: { xs: "center", lg: "left" },
                      mb: 5,
                    }}
                  >
                    <Box sx={{ flexShrink: 0 }}></Box>
                    <Box sx={{ flexGrow: 1, ml: 3 }}>
                      <Typography variant="h5" color="primary">
                        {item.name}
                      </Typography>

                      <Box
                        sx={{
                          display: { xs: "block", lg: "flex" },
                          alignItems: "center",
                          textAlign: { xs: "center", lg: "left" },
                        }}
                      >
                        {
                          <CardMedia
                            component="img"
                            style={{
                              height: "100px",
                              width: "100px",
                              objectFit: "contain",
                              margin: "10px auto",
                            }}
                            image={item.image}
                            alt={item.name}
                          />
                        }
                        <Typography
                          variant="body1"
                          className="fw-bold"
                          whiteSpace={{ xs: "normal", lg: "nowrap" }}
                        >
                          {item.price} €
                        </Typography>

                        <Button onClick={() => removeFromPannier(item)}>
                          -
                        </Button>
                        <input
                          className="quantity"
                          style={{
                            margin: "0 10px",
                            textAlign: "center",
                            width: "50px",
                          }}
                          min={0}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, item)}
                          type="number"
                          readOnly
                        />
                        <Button
                          disabled={item.inventory === item.quantity}
                          onClick={() => addItemToCart(item)}
                        >
                          +
                        </Button>
                        <Typography variant="body1" className="fw-bold">
                          Total Price: {(item.quantity * item.price).toFixed(2)}{" "}
                          €
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Box
                  sx={{
                    height: "2px",
                    backgroundColor: "#1266f1",
                    opacity: 1,
                    my: 4,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                    mb: 2,
                    backgroundColor: "#e1f5fe",
                  }}
                >
                  <Typography variant="h5" className="fw-bold">
                    Total:
                  </Typography>
                  <Typography variant="h5" className="fw-bold">
                    {Total.toFixed(2)} €
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => ByProducts()}
                  >
                    Passer la commande
                  </Button>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(emptyCart())}
                    data-testid="empty-Cart"
                  >
                    Empty Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;
