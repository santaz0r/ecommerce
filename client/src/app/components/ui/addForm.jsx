import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { validator } from "../../utils/validator";
// import { nanoid } from "nanoid";
import productsService from "../../services/products.service";
const AddForm = ({ items }) => {
    const [data, setData] = useState({
        title: "",
        category: "",
        price: "",
        inStock: "",
        image: "",
        description: ""
    });
    const itemsList = items.map((c) => c.name);
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        title: {
            isRequired: {
                message: "Обязательно для заполнения"
            }
        },
        price: {
            isRequired: {
                message: "Обязательно для заполнения"
            }
        },
        inStock: {
            isRequired: {
                message: "Введите количество"
            }
        },
        image: {
            isRequired: {
                message: "Добавьте изображение продукта"
            }
        },
        category: {
            isRequired: {
                message: "Обязательно выберите категорию товара"
            }
        },
        description: {
            isRequired: {
                message: "Несколько строк о товаре"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    console.log(data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;
        const newData = {
            ...data,
            rate: 1,
            id: 21
        };
        console.log("newData", newData);
        try {
            await productsService.create(newData);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1>Добавить новый товар</h1>

            <TextField
                label="Наименование товара"
                name="title"
                onChange={handleChange}
                value={data.title}
                error={errors.title}
            />
            <TextField
                label="Описание товара"
                name="description"
                onChange={handleChange}
                value={data.description}
                error={errors.description}
            />
            {items && (
                <SelectField
                    defaultOption="Выбрать...."
                    options={itemsList}
                    label="Выберите категорию"
                    onChange={handleChange}
                    value={data.category}
                    name="category"
                    error={errors.category}
                />
            )}
            <TextField
                label="Стоимость"
                name="price"
                onChange={handleChange}
                value={data.price}
                error={errors.price}
            />
            <TextField
                label="Количетсво"
                name="inStock"
                onChange={handleChange}
                value={data.inStock}
                error={errors.inStock}
            />
            <TextField
                label="Изображение товара (url)"
                error={errors.image}
                name="image"
                value={data.image}
                onChange={handleChange}
            />
            <button disabled={!isValid}>Добавить</button>
        </form>
    );
};
AddForm.propTypes = {
    items: PropTypes.array.isRequired
};
export default AddForm;
