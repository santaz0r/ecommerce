import React from "react";
import PropTypes from "prop-types";
import { translateText } from "../../utils/translateText";

const CategoriesList = ({ categories, onItemSelect, selectedItem }) => {
    return (
        <ul className="list-group">
            {categories.map((category) => (
                <li
                    key={category.id}
                    className={
                        "list-group-item" +
                        (category.name === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(category.name)}
                    role="button"
                >
                    {translateText(category.name)}
                </li>
            ))}
        </ul>
    );
};
CategoriesList.propTypes = {
    categories: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.string
};
export default CategoriesList;
