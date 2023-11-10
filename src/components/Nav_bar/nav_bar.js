import React from "react";
import { AppBar, Box, Toolbar, Grid } from "@mui/material";
import styles from "./style.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "../../store/slices/carteSlice.js";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice.js";
import { emptyCart } from "../../store/slices/carteSlice.js";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const CartNumber = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserConnected = useSelector((state) => state.entities.users.userId);
  const theme = useTheme();

  const handleLogout = async () => {
    dispatch(emptyCart());
    await dispatch(logout());
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "#FCF5EE" }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item> </Grid>

            <Grid item xs>
              {" "}
              <Box display="flex" justifyContent="center">
                <img
                  src="logo_thebradery.png"
                  alt="Your Logo"
                  style={{ maxHeight: "80px" }}
                />
              </Box>
            </Grid>

            <Grid item>
              {" "}
              {/* Right side, for buttons or other elements */}
              <Box display="flex" gap={2}>
                {UserConnected ? (
                  <Link to="/cart">
                    <LocalGroceryStoreIcon /> ({CartNumber})
                  </Link>
                ) : (
                  ""
                )}

                <Link style={styles.menuItem} to={"/Products"}>
                  Products
                </Link>
                {UserConnected ? (
                  <Link style={styles.menuItem} to={"/MyProfile"}>
                    My account
                  </Link>
                ) : (
                  ""
                )}
                {UserConnected ? (
                  <Link style={styles.menuItem} onClick={handleLogout}>
                    Logout
                  </Link>
                ) : (
                  <Link style={styles.menuItem} to={"/login"}>
                    Login
                  </Link>
                )}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar }} />
    </Box>
  );
};

export default Navbar;
