import React, { useState, useCallback, useEffect } from "react";
import { Modal, message } from "antd";
import axios from "axios";

const EditCategory = (props) => {
    const [visible, setVisible] = useState(false);

    const [categoryname, setCategoryname] = useState("");
    const [discount, setDiscount] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = (e) => {
        setVisible(false);
    };

    const initializeCategory = useCallback(async () => {
        setCategoryname(props.category.categoryname);
        setDiscount(props.category.discount);
    }, [props]);

    useEffect(() => {
        initializeCategory();
    }, [initializeCategory]);

    const onSaveChanges = (e) => {
        e.preventDefault();
        axios
            .put("/api/categories/" + props.category._id, {
                categoryname,
                discount,
            })
            .then((res) => {
                message.success("Category has been updated.");
                setVisible(false);
                props.loadCategories();
            });
    };

    return (
        <React.Fragment>
            <button onClick={showModal}>
                <i className="fas fa-pen"></i>
            </button>
            <Modal
                className="w-25"
                centered
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <br />
                <br />
                <form onSubmit={onSaveChanges}>
                    <label>Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="categoryname"
                        value={categoryname}
                        onChange={(e) => setCategoryname(e.target.value)}
                        required
                    />
                    <br />
                    <label>Discount:</label>
                    <input
                        className="form-control"
                        type="number"
                        placeholder="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        min="0"
                        max="100"
                        required
                    />
                    <br />
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark w-100">
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default EditCategory;
