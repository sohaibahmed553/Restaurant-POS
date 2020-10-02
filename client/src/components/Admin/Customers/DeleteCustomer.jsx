import React from "react";
import { Modal, message } from "antd";
import axios from "axios";

import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const DeleteCustomer = (props) => {
    const deleteCustomer = async () => {
        await axios.delete("/api/customers/" + props.id).then((res) => {
            message.success("Customer deleted.");
            props.loadCustomers();
        });
    };

    const showDeleteConfirm = () => {
        confirm({
            title: "Are you sure delete this customer?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                deleteCustomer();
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    return (
        <React.Fragment>
            <button onClick={showDeleteConfirm}>
                <i className="fas fa-trash-alt"></i>
            </button>
        </React.Fragment>
    );
};

export default DeleteCustomer;
