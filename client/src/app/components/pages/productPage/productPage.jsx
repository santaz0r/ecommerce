import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import productsService from "../../../services/products.service";
const ProductPage = ({ id }) => {
    const [product, setProduct] = useState();

    useEffect(() => {
        productsService.getById(id).then((data) => setProduct(data));
    }, []);
    if (product) {
        return (
            <div className="d-flex">
                <div>
                    <img
                        style={{ height: "10rem" }}
                        src={product.image}
                        alt="kekw"
                    />
                </div>
                <div>
                    <p>id: {product.id}</p>
                    <h3>{product.title}</h3>
                    <p>Цена: ${product.price}</p>
                    <p>{product.description}</p>
                    <p>{product.category}</p>
                    <p>Рейтинг: {product.rate}/5</p>
                    <p>На складе: {product.inStock}</p>
                </div>
            </div>
        );
    } else return "loading";
};
ProductPage.propTypes = {
    id: PropTypes.string
};
export default ProductPage;
