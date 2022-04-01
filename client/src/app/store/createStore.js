import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";

const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
