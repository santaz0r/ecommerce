import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/pages/productPage/productPage";
import ProductsList from "../components/pages/productsList/productsList";

const Products = () => {
    const { productId } = useParams();
    return (
        <>{productId ? <ProductPage id={productId} /> : <ProductsList />} </>
    );
};

export default Products;
