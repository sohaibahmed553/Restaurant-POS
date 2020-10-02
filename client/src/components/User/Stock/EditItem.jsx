import React, { useState, useCallback, useEffect } from "react";
import { Modal, message } from "antd";
import axios from "axios";

const EditItem = (props) => {
    const [visible, setVisible] = useState(false);

    const [itemname, setItemname] = useState("");
    const [discount, setDiscount] = useState("");
    const [price, setPrice] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = (e) => {
        setVisible(false);
    };

    const initializeItem = useCallback(async () => {
        setItemname(props.item.itemname);
        setDiscount(props.item.discount);
        setPrice(props.item.price);
    }, [props]);

    useEffect(() => {
        initializeItem();
    }, [initializeItem]);

    const onSaveChanges = (e) => {
        e.preventDefault();
        axios
            .put("/api/items/" + props.item._id, {
                itemname,
                discount,
                price,
            })
            .then((res) => {
                message.success("Item has been updated.");
                setVisible(false);
                props.loadItems(props.categoryid);
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
                        placeholder="Item Name"
                        value={itemname}
                        onChange={(e) => setItemname(e.target.value)}
                        required
                    />
                    <br />
                    <label>Price:</label>
                    <input
                        className="form-control"
                        type="number"
                        placeholder="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <br />
                    <label>Discount:</label>
                    <input
                        className="form-control"
                        type="number"
                        placeholder="discount"
                        value={discount}
                        min="0"
                        max="100"
                        onChange={(e) => setDiscount(e.target.value)}
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

export default EditItem;
