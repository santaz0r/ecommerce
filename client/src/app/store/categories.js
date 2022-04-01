import { createSlice } from "@reduxjs/toolkit";
import categoriesService from "../services/categories.service";
import { isOutdated } from "../utils/isOutdated";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        categoriesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;

const { categoriesRequested, categoriesReceived, categoriesRequestFailed } =
    actions;

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const categories = await categoriesService.get();
            dispatch(categoriesReceived(categories));
        } catch (error) {
            dispatch(categoriesRequestFailed(error.message));
        }
    }
};

export const getCategoriesList = () => (state) => state.categories.entities;
export const getProductById = (prodId) => (state) => {
    if (state.categories.entities) {
        return state.categories.entities.find((item) => item.id === prodId);
    }
};
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;

export default categoriesReducer;
