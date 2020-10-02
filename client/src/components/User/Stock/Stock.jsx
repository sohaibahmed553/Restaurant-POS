import React, { useState, useEffect } from "react";
import axios from "axios";

import { message } from "antd";

import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

const Stock = () => {
    const [categories, setCategories] = useState([]);
    //These items are updating on changing the category
    const [items, setItems] = useState([]);

    //now create variables to get the values from inputs
    //This item is the id of item which is needed to update the quantity
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState("");
    //item name,categoryid and price to to add a new item
    const [categoryid, setCategoryId] = useState("");
    const [itemname, setItemName] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        await axios.get("/api/categories/").then((res) => {
            setCategories(res.data);
        });
    };
    const loadItems = async (categoryid) => {
        await axios.get("/api/items/" + categoryid).then((res) => {
            setItems(res.data);
        });
    };

    const onCategoryChange = async (option) => {
        setCategoryId(option);
        loadItems(option);
    };

    const updateQuantity = async () => {
        if (item.length && quantity.length) {
            await axios
                .put("/api/items/quantity/" + item, {
                    quantity,
                })
                .then((res) => {
                    message.success("Quantity updated.");
                    loadItems(categoryid);
                });
        } else {
            message.error("Choose item and add quantity to update.");
        }
    };

    const addItem = async () => {
        if (categoryid.length && itemname.length && price.length) {
            await axios
                .post("/api/items/", {
                    categoryid,
                    itemname,
                    price,
                })
                .then((res) => {
                    message.success("Item added.");
                    loadItems(categoryid);
                });
        } else {
            message.error(
                "Please select Category and add item name and price."
            );
        }
    };

    return (
        <React.Fragment>
            <br />
            <div className="row d-flex align-items-center">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <select
                        className="browser-default custom-select w-100"
                        onChange={(option) =>
                            onCategoryChange(option.target.value)
                        }
                    >
                        <option value="" disabled selected>
                            Choose Category
                        </option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.categoryname}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-sm-4"></div>
            </div>
            <br />

            <div className="row d-flex align-items-center">
                <div className="col-lg-2"></div>
                <div className="col-lg-1">
                    <label className="font-weight-bold ">Add Item:</label>
                </div>
                <div className="col-lg-2">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Item Name"
                        value={itemname}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div className="col-lg-2">
                    <input
                        className="form-control"
                        type="number"
                        placeholder="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="col-lg-2 d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-dark btn-sm w-75"
                        onClick={addItem}
                    >
                        Add
                    </button>
                </div>
                <div className="col-lg-3"></div>
            </div>
            <br />
            <div className="row d-flex align-items-center">
                <div className="col-lg-2"></div>
                <div className="col-lg-1">
                    <label className="font-weight-bold">Update Quantity:</label>
                </div>
                <div className="col-lg-2">
                    <select
                        className="browser-default custom-select w-100"
                        onChange={(option) => setItem(option.target.value)}
                    >
                        <option value="" disabled selected>
                            Choose Item
                        </option>
                        {items.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.itemname}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-lg-2">
                    <input
                        className="form-control"
                        type="number"
                        placeholder="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="col-lg-2 d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-dark btn-sm w-75"
                        onClick={updateQuantity}
                    >
                        Update
                    </button>
                </div>
                <div className="col-lg-3"></div>
            </div>
            <br />

            <div className="container">
                <table className="table table-hover table-fixed">
                    <thead>
                        <tr className="table-secondary">
                            <th className="font-weight-bold">Sr No</th>
                            <th className="font-weight-bold">Item Name</th>
                            <th className="font-weight-bold">Price</th>
                            <th className="font-weight-bold">Quantity</th>
                            <th className="font-weight-bold">Discount</th>
                            <th className="font-weight-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{item.itemname}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.discount}%</td>
                                <td>
                                    <EditItem
                                        item={item}
                                        loadItems={loadItems}
                                        categoryid={categoryid}
                                    />
                                    <DeleteItem
                                        id={item._id}
                                        loadItems={loadItems}
                                        categoryid={categoryid}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default Stock;
