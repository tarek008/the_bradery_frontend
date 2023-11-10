import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadUserById } from "../../store/slices/userSlice.js";
import { fetchCommandes } from "../../store/slices/CommandeSlice.js";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./style.js";
import { Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

const MyProfile = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.entities.users.userId);
  const [user, setUser] = React.useState([]);
  const [commandes, setCommandes] = React.useState([]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(isSmallScreen);

  useEffect(() => {
    dispatch(loadUserById(UserId))
      .then((actionResult) => {
        setUser(actionResult.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
    dispatch(fetchCommandes(UserId)).then((actionResult) => {
      setCommandes(actionResult.data);
    });
  }, [UserId, dispatch, setUser]);

  return (
    <div
      style={{
        paddingTop: "80px",
        paddingBottom: "500px",
      }}
    >
      <Grid container justify="center" paddingBottom={"100px"} spacing={2}>
        <Grid item xs={12}>
          <Item style={styles.sectionHeader}>My Profile</Item>
        </Grid>
        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={11} md={4}>
          <Item style={styles.profileItem}>Name: {user.username}</Item>
        </Grid>
        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={11} md={4}>
          <Item style={styles.profileItem}>Email: {user.email}</Item>
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={1} md={1}></Grid>

        <Grid item xs={11}>
          <h1 style={styles.commandHeader}>My Commandes</h1>
        </Grid>
        <Grid item xs={1} md={1}></Grid>

        <Grid item xs={10} md={10}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="nested table">
              <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
                <TableRow>
                  {!isSmallScreen && (
                    <TableCell style={styles.TableHeaderCells}>
                      Commande ID
                    </TableCell>
                  )}
                  <TableCell align="center" style={styles.TableHeaderCells}>
                    Products (Nested Table)
                  </TableCell>
                  {!isSmallScreen && (
                    <TableCell align="right" style={styles.TableHeaderCells}>
                      Total Quantity
                    </TableCell>
                  )}
                  {!isSmallScreen && (
                    <TableCell align="right" style={styles.TableHeaderCells}>
                      Total Price
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {commandes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Commandes
                    </TableCell>
                  </TableRow>
                ) : (
                  commandes.map((commande) => (
                    <React.Fragment key={commande.commande_id}>
                      <TableRow>
                        {!isSmallScreen && (
                          <TableCell component="th" scope="row">
                            {commande.commande_id}
                          </TableCell>
                        )}
                        <TableCell align="right">
                          {/* Nested table for products */}
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {commande.products.map((product, index) => (
                                <TableRow key={index}>
                                  <TableCell>{product.name}</TableCell>
                                  <TableCell align="right">
                                    {product.price}
                                  </TableCell>
                                  <TableCell align="right">
                                    {product.quantity}
                                  </TableCell>
                                </TableRow>
                              ))}
                              {isSmallScreen && (
                                <TableRow style={styles.TotalPrice}>
                                  Total Price : {commande.total_price} €
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableCell>
                        {!isSmallScreen && (
                          <TableCell align="right">
                            {commande.total_quantity}
                          </TableCell>
                        )}
                        {!isSmallScreen && (
                          <TableCell align="right">
                            {commande.total_price}
                          </TableCell>
                        )}
                      </TableRow>
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};
export default MyProfile;
