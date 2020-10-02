import React, { useState, useCallback, useEffect } from "react";
import { Modal, message } from "antd";
import axios from "axios";

const EditCustomer = (props) => {
    const [visible, setVisible] = useState(false);

    const [customername, setCustomername] = useState("");
    const [contact, setContact] = useState("");
    const [specialdiscount, setSpecialdiscount] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = (e) => {
        setVisible(false);
    };

    const initializeCustomer = useCallback(async () => {
        setCustomername(props.customer.customername);
        setContact(props.customer.contact);
        setSpecialdiscount(props.customer.specialdiscount);
    }, [props]);

    useEffect(() => {
        initializeCustomer();
    }, [initializeCustomer]);

    const onSaveChanges = (e) => {
        e.preventDefault();
        axios
            .put("/api/customers/" + props.customer._id, {
                customername,
                contact,
                specialdiscount,
            })
            .then((res) => {
                message.success("Customer has been updated.");
                setVisible(false);
                props.loadCustomers();
            })
            .catch((err) => {
                message.error(err.response.data.errors[0].msg);
                initializeCustomer();
                setVisible(false);
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
                        placeholder="Customer Name"
                        value={customername}
                        onChange={(e) => setCustomername(e.target.value)}
                        required
                    />
                    <br />
                    <label>Contact:</label>
                    <input
                        className="form-control w-100"
                        type="tel"
                        placeholder="contact"
                        value={contact}
                        pattern="[0-9]{11}"
                        onChange={(e) => setContact(e.target.value)}
                        required
                    />
                    <br />
                    <label>Special Discount:</label>
                    <input
                        className="form-control w-100"
                        type="number"
                        placeholder="Special Discount"
                        value={specialdiscount}
                        min="0"
                        max="100"
                        onChange={(e) => setSpecialdiscount(e.target.value)}
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

export default EditCustomer;
