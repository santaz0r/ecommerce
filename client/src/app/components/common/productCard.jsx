import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const ProductCard = ({ products }) => {
    const history = useHistory();

    return products.map((product) => {
        return (
            <div key={product.id} className="card d-flex">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <img
                            style={{ height: "15rem", maxWidth: "170px" }}
                            src={product.image}
                            className="card-img-top "
                            alt="product photo"
                        />
                    </div>
                    <div style={{ maxWidth: "300px" }}>
                        <div className="card-body">
                            <p>Product&apos;s id: #{product.id}</p>
                            <h5 className="card-title">{product.title}</h5>
                            <p>Price: ${product.price}</p>
                            <p>Rate: {product.rate}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => history.push(`/products/${product.id}`)}
                        className="btn btn-primary"
                        style={{ height: "40px" }}
                    >
                        Подробнее
                    </button>
                </div>
            </div>
        );
    });
};

ProductCard.propTypes = {
    item: PropTypes.array
};
export default ProductCard;
