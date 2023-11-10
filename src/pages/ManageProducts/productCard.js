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

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const UserConnected = useSelector((state) => state.entities.users.userId);

  const addToPannier = (product) => {
    dispatch(addToCart(product));
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
  return (
    <Card sx={{ maxWidth: 250, width: 250 }}>
      <Link to={"/Products/" + product.id}>
        <CardMedia
          component="img"
          height="200px"
          image={product.image}
          alt={product.name}
        />
      </Link>
      <Typography
        variant="body2"
        sx={{
          color: "red",
          fontWeight: "bold",
          height: "20px", // Set a fixed height for the alert area
          marginTop: "8px",
          visibility: product.inventory < 10 ? "visible" : "hidden", // Hide or show the alert
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
          <StyledButton
            variant="contained"
            size="small"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => addToPannier(product)}
          >
            Add to Cart
          </StyledButton>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}
