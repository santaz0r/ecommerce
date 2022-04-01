import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import productsService from "../../services/products.service";
import {
    getCategoriesList,
    getCategoriesLoadingStatus
} from "../../store/categories";
import { productDeleted, getProductsList } from "../../store/products";
import Table from "../common/table/table";
import AddForm from "../ui/addForm";

const Dashboard = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());
    const categories = useSelector(getCategoriesList());
    const categoriesLoadingStatus = useSelector(getCategoriesLoadingStatus());
    const onClick = (id) => {
        console.log("kekId: ", id);
    };
    const handleDelete = (id) => {
        dispatch(productDeleted(id));
    };

    const columns = {
        id: {
            path: "id",
            name: "Id"
        },
        name: {
            path: "title",
            name: "Наименование товара"
        },
        category: {
            path: "category",
            name: "Категория"
        },
        price: {
            path: "price",
            name: "Стимость"
        },
        inStock: {
            path: "inStock",
            name: "Количество"
        },
        photo: {
            path: "image",
            name: "Фото",
            component: (product) => (
                <img
                    src={product.image}
                    alt="image"
                    style={{ height: "50px" }}
                />
            )
        },
        actions: {
            name: "Действия",
            component: (product) => (
                <div className="d-flex justify-content-around">
                    <i
                        onClick={() => onClick(product.id)}
                        role={"button"}
                        className="bi bi-pencil-fill"
                    ></i>
                    <i
                        onClick={() => handleDelete(product.id)}
                        role={"button"}
                        className="bi bi-x-circle-fill text-danger"
                    ></i>
                </div>
            )
        }
    };

    if (products) {
        return (
            <>
                {!categoriesLoadingStatus ? (
                    <div className="row">
                        <div className="col-md-2">
                            <AddForm items={categories} />
                        </div>
                        <div className="col-md-6 offset-md-0 text-center">
                            <Table columns={columns} data={products} />
                        </div>
                    </div>
                ) : (
                    "loading"
                )}
            </>
        );
    }
    return "Loading";
};

export default Dashboard;
