import React, { useState, useEffect } from "react";
import axios from "axios";

import { message, Spin } from "antd";

import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";

const Categories = (props) => {
    const [loading, setLoading] = useState("false");
    const [categoryname, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        await axios.get("/api/categories/").then((res) => {
            setCategories(res.data);
            setLoading(false);
        });
    };

    const postCategory = async () => {
        if (categoryname.length) {
            await axios
                .post("/api/categories/", {
                    categoryname,
                })
                .then((res) => {
                    message.success("Category added.");

                    loadCategories();
                });

            console.log(categoryname);
        } else {
            message.error("Enter something to add.");
        }
    };

    return (
        <React.Fragment>
            <div className="container">
                {console.log(categories)}
                <br />
                <div className="row  d-flex align-items-center">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-6">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Enter a Category"
                            value={categoryname}
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="col-lg-2 d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-dark w-100"
                            onClick={postCategory}
                        >
                            Add
                        </button>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
                <br />
                <table className="table table-hover table-fixed">
                    <thead>
                        <tr className="table-secondary">
                            <th className="font-weight-bold">Sr No</th>
                            <th className="font-weight-bold">Category</th>
                            <th className="font-weight-bold">Discount</th>
                            <th className="font-weight-bold">Action</th>
                        </tr>
                    </thead>
                    {loading && <Spin tip="Loading..." />}
                    {!loading && (
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{category.categoryname}</td>
                                    <td>{category.discount}%</td>
                                    <td>
                                        <EditCategory
                                            category={category}
                                            loadCategories={loadCategories}
                                        />
                                        <DeleteCategory
                                            id={category._id}
                                            loadCategories={loadCategories}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </React.Fragment>
    );
};

export default Categories;
