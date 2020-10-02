import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

import "../../../css/Order.css";

const Order = () => {
    //Variables required to send when order is placed
    const [items, setItems] = useState([]);
    const [type, setType] = useState("");
    //other variables
    const [categories, setCategories] = useState([]);
    const [inputitems, setInputItems] = useState([]);
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState("");
    const [contact, setContact] = useState("");
    const [customername, setCustomerName] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        await axios.get("/api/categories/").then((res) => {
            setCategories(res.data);
        });
    };

    const loadInputItems = async (categoryid) => {
        await axios.get("/api/items/" + categoryid).then((res) => {
            setInputItems(res.data);
        });
    };

    const loadItemDetail = async (itemid) => {
        await axios.get("/api/items/one/" + itemid).then((res) => {
            setItem(res.data);
        });
    };

    const onCategoryChange = async (option) => {
        setInputItems([]);
        loadInputItems(option);
    };

    const onItemChange = async (option) => {
        loadItemDetail(option);
    };

    const onItemAdd = () => {
        if (item.length && quantity.length && quantity > 0) {
            const price =
                item[0].price - (item[0].price * item[0].discount) / 100;
            setItems([
                ...items,
                {
                    itemname: item[0].itemname,
                    price: price,
                    quantity: quantity,
                },
            ]);
            message.success("Item added");
        } else {
            message.error(
                "Fill all details and quantity should be greater than zero."
            );
        }
    };

    const handleOrderSubmitted = async (e) => {
        e.preventDefault();
        const total = await sum(items);
        if (items.length) {
            console.log(total, type, items);

            await axios
                .post("/api/orders/", {
                    type,
                    items,
                    total,
                    contact,
                    customername,
                })
                .then((res) => {
                    window.location.reload(false);
                });
        } else {
            message.error("Please enter any item to place order.");
        }
    };

    const sum = (jsonArr) => {
        let sum = 0;
        jsonArr.forEach((json) => {
            sum = sum + json.price * json.quantity;
        });
        return sum;
    };

    return (
        <React.Fragment>
            <div className="container">
                <br />
                <form onSubmit={handleOrderSubmitted} name="form">
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-3">
                            <select
                                className="browser-default custom-select"
                                onChange={(option) =>
                                    setType(option.target.value)
                                }
                                required
                            >
                                <option value="" disabled selected>
                                    Select Order Type
                                </option>
                                <option value="Dining">Dining</option>
                                <option value="Take Away">Take Away</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <input
                                className="form-control w-100"
                                type="text"
                                placeholder="Customer Name"
                                value={customername}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-sm-3">
                            <input
                                className="form-control w-100"
                                type="tel"
                                placeholder="contact"
                                value={contact}
                                pattern="[0-9]{11}"
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <br />

                    <div className="row d-flex align-items-center">
                        <div className="col-sm-3">
                            <select
                                className="browser-default custom-select w-100"
                                onChange={(option) =>
                                    onCategoryChange(option.target.value)
                                }
                                required
                            >
                                <option value="" disabled selected>
                                    Choose Category
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.categoryname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <select
                                className="browser-default custom-select w-100"
                                onChange={(option) =>
                                    onItemChange(option.target.value)
                                }
                                required
                            >
                                <option value="0" selected>
                                    Choose Item
                                </option>
                                {inputitems.map((inputitem) => (
                                    <option
                                        key={inputitem._id}
                                        value={inputitem._id}
                                    >
                                        {inputitem.itemname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-lg-3">
                            <input
                                className="form-control w-100"
                                type="number"
                                placeholder="quantity"
                                value={quantity}
                                min="1"
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-3 d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-dark btn-sm w-75"
                                onClick={onItemAdd}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-8">
                            <table className="table table-hover table-fixed">
                                <thead>
                                    <tr className="table-secondary">
                                        <th className="font-weight-bold">
                                            Sr No
                                        </th>
                                        <th className="font-weight-bold">
                                            Item Name
                                        </th>
                                        <th className="font-weight-bold">
                                            Price
                                        </th>
                                        <th className="font-weight-bold">
                                            Quantity
                                        </th>
                                        <th className="font-weight-bold">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.itemname}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                {item.price * item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-sm-4 d-flex flex-column  card p-5">
                            <h2 className="text-center h2-responsive font-weight-bold">
                                Total
                            </h2>
                            <br />
                            <h4 className="text-center text-success">
                                {sum(items)}
                            </h4>
                            <br />
                            <div className="text-center">
                                <button
                                    className="btn btn-dark w-75"
                                    type="submit"
                                >
                                    Order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Order;
