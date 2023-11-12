import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/carteSlice";
import { useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const UserConnected = useSelector((state) => state.entities.users.userId);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const addToPannier = (product) => {
    dispatch(addToCart(product));
    setSnackbarOpen(true);
  };
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1),
    borderRadius: 4,
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      margin: 0,
      marginRight: theme.spacing(1),
    },
  }));
  // Check if the product is already in the cart and get its quantity
  const cartItems = useSelector((state) => state.entities.cart.items);
  const isInCart = cartItems.find((item) => item.id === product.id);
  // Disable the button if the product is already in the cart and the quantity is equal or greater than the inventory
  const disableAddToCart = isInCart && isInCart.quantity >= product.inventory;

  return (
    <Card sx={{ maxWidth: 250, width: 250 }}>
      <CardMedia
        component="img"
        height="200px"
        image={product.image}
        alt={product.name}
      />
      <Typography
        variant="body2"
        sx={{
          color: "red",
          fontWeight: "bold",
          height: "20px",
          marginTop: "8px",
          visibility: product.inventory < 10 ? "visible" : "hidden",
        }}
      >
        <ErrorOutlineIcon
          fontSize="small"
          sx={{ verticalAlign: "middle", marginRight: "4px" }}
        />
        Last items in shop
      </Typography>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">{product.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{product.price} €</Typography>
          </Grid>
        </Grid>
        {UserConnected ? (
          <div>
            <StyledButton
              variant="contained"
              size="small"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => addToPannier(product)}
              disabled={disableAddToCart}
              data-testid="AddtoCart"
            >
              Add to Cart
            </StyledButton>
            {/* Snackbar Component */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Item added to your Cart!
              </Alert>
            </Snackbar>
          </div>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}
