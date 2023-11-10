import React, { useEffect } from "react";
import { useState } from "react";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import ProductCard from "./productCard";
import { getProducts } from "../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.entities.products.list);
  const pageSize = 15;
  const pageCount = Math.ceil(products.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentProducts = products.slice(startIdx, endIdx);
  return (
    <div
      style={{
        paddingBottom: "100px",
        paddingTop: "100px",
        paddingLeft: "50px",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          {currentProducts.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={3} lg={2.4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Stack spacing={2} alignItems="center" style={{ paddingTop: "20px" }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Stack>
      </Box>
    </div>
  );
}

export default ProductLayout;
