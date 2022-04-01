import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCategoriesList } from "../../../store/categories";
import {
    getProductsLoadingStatus,
    loadProductsList
} from "../../../store/products";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const productsLoadingStatus = useSelector(getProductsLoadingStatus());
    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadCategoriesList());
    }, []);

    if (productsLoadingStatus) return "Loading...kekw";
    return children;
};

export default AppLoader;
