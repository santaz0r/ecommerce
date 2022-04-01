import React, { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import CategoriesList from "../../common/categoriesList";
import Pagination from "../../common/pagination";
import _ from "lodash";
import SortBy from "../../common/sortBy";
import ProductCard from "../../common/productCard";
import SearchInput from "../../ui/searchInput";
import { useSelector } from "react-redux";
import { getProductsList } from "../../../store/products";
import {
    getCategoriesList,
    getCategoriesLoadingStatus
} from "../../../store/categories";

const sortByInitState = { iter: "id", order: "asc" };

const ProductsList = () => {
    const products = useSelector(getProductsList());

    const categories = useSelector(getCategoriesList());
    const categoriesLoadingStatus = useSelector(getCategoriesLoadingStatus());

    const [currentPage, setCurrentpage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState(sortByInitState);
    const pageSize = 3;
    const [search, setSearch] = useState("");
    const handleChange = ({ target }) => {
        setSearch(target.value);
    };

    useEffect(() => {
        setCurrentpage(1);
    }, [selectedCategory]);

    const handlePageChange = (page) => {
        setCurrentpage(page);
    };
    function filteredData(data) {
        const filteredProducts =
            selectedCategory && search
                ? data.filter(
                      (product) =>
                          JSON.stringify(product.category) ===
                              JSON.stringify(selectedCategory) &&
                          product.title
                              .toLowerCase()
                              .includes(search.toLowerCase())
                  )
                : search
                ? data.filter((prod) =>
                      prod.title.toLowerCase().includes(search.toLowerCase())
                  )
                : selectedCategory
                ? data.filter(
                      (product) =>
                          JSON.stringify(product.category) ===
                          JSON.stringify(selectedCategory)
                  )
                : data;
        return filteredProducts;
    }
    if (products) {
        const filteredProducts = filteredData(products);
        const itemsCount = filteredProducts.length;
        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.iter],
            [sortBy.order]
        );
        const productsCrop = paginate(sortedProducts, currentPage, pageSize);
        const handleSelect = (item) => {
            setSelectedCategory(item);
            setSortBy(sortByInitState);
        };
        const clearFilter = () => {
            setSelectedCategory(undefined);
        };
        const clearSort = () => {
            setSortBy(sortByInitState);
        };
        const handleSort = (item) => {
            setSortBy(item);
        };
        const handleClearSearch = () => {
            setSearch("");
        };

        return (
            <>
                <>
                    <SortBy
                        onSort={handleSort}
                        onClearSort={clearSort}
                        iter={sortBy.iter}
                        currentSortBy={sortBy.iter}
                        currentSortOrder={sortBy.order}
                    />

                    <div className="text-center">
                        <div className="row">
                            {!categoriesLoadingStatus ? (
                                <div className="col-md-1 offset-md-1">
                                    <CategoriesList
                                        categories={categories}
                                        selectedItem={selectedCategory}
                                        onItemSelect={handleSelect}
                                    />
                                    <button
                                        className="btn btn-secondary mt-2"
                                        onClick={clearFilter}
                                    >
                                        Очистить
                                    </button>{" "}
                                </div>
                            ) : (
                                "loading"
                            )}

                            <div className="d-flex flex-column col-md-6 offset-md-1">
                                <div className="d-flex flex-column">
                                    <SearchInput
                                        onChange={handleChange}
                                        value={search}
                                        onClearSearch={handleClearSearch}
                                    />
                                    <ProductCard products={productsCrop} />
                                </div>

                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        itemsCount={itemsCount}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </>
        );
    }
    return "Loading...";
};

export default ProductsList;
