import { createAction, createSlice } from "@reduxjs/toolkit";
import productsService from "../services/products.service";
import { isOutdated } from "../utils/isOutdated";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        deleteProduct: (state, action) => {
            console.log(action.payload);
            state.entities = state.entities.filter((item) => {
                return item.id !== action.payload.id;
            });
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    deleteProduct
} = actions;
const productDeleteRequesed = createAction("products/productDeleteRequesed");
const deleteProductFailed = createAction("products/deleteProductFailed");
export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const products = await productsService.get();
            dispatch(productsReceived(products));
        } catch (error) {
            dispatch(productsRequestFailed(error.message));
        }
    }
};

export const getProductsList = () => (state) => state.products.entities;
export const getProductById = (prodId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((item) => item.id === prodId);
    }
};
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export const productDeleted = (id) => async (dispatch) => {
    dispatch(productDeleteRequesed());
    try {
        await productsService.delete(id);
        return dispatch(deleteProduct({ id }));
    } catch (error) {
        dispatch(deleteProductFailed());
    }
};

export default productsReducer;
