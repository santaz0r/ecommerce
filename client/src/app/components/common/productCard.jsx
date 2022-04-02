import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const ProductCard = ({ products }) => {
    const history = useHistory();

    return products.map((product) => {
        return (
            <div key={product.id} className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={product.image}
                            className="img-fluid rounded-start"
                            alt="product photo"
                            style={{ maxHeight: "200px" }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text text-truncate">
                                {product.description}
                            </p>
                            <p className="d-flex justify-content-between card-text">
                                <small className="text-muted">
                                    Рейтинг: {product.rate}
                                </small>
                                <small className="text-muted">
                                    Цена: ${product.price}
                                </small>
                            </p>
                            <button
                                onClick={() =>
                                    history.push(`/products/${product.id}`)
                                }
                                className="btn btn-primary"
                                style={{ height: "40px" }}
                            >
                                Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
};

ProductCard.propTypes = {
    item: PropTypes.array
};
export default ProductCard;
