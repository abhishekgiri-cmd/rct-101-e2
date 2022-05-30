import React, { useEffect, useState } from "react";
import { Flex, Grid } from "@chakra-ui/react";
import axios from "axios";

import Product from "./Product";
import AddProduct from "./AddProduct";
import Pagination from "./Pagination";

const Products = () => {
  const [pageFilter, setPageFilter] = useState({
    pageNumber: 1,
    limit: 3,
    totalCount: 0,
  });
  const [products, setProducts] = useState([]);

  const { pageNumber, limit } = pageFilter;

  const handleOnAdd = (body) => {
    axios.post("http://localhost:8080/products", body).then((r) => {
      setProducts([...products, r.data]);
    });
  };
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        `http://localhost:8080/products?_page=${pageNumber}&_limit=${limit}`
      );
      setPageFilter({
        ...pageFilter,
      
      });

      setProducts(response.data);
    };
    getProducts();
  }, [pageNumber, limit]);
  return (
    <Flex
    direction="column"
    justifyContent="center"
    alignItems="center"
    borderRadius={50}
   
    >
      <AddProduct add={handleOnAdd} />
      <Grid  gridGap={4} gridTemplateColumns="300px 300px 300px">
        {products.map((p) => (
          <Product key={p.id} {...p} />
        ))}
      </Grid>
      <Pagination pageFilter={pageFilter} setPageFilter={setPageFilter} />
    </Flex>
  );
};

export default Products;
