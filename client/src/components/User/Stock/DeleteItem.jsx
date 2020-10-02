import React from "react";
import { Modal, message } from "antd";
import axios from "axios";

import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const DeleteItem = (props) => {
    const deleteItem = async () => {
        await axios.delete("/api/items/" + props.id).then((res) => {
            message.success("Item deleted.");
            props.loadItems(props.categoryid);
        });
    };

    const showDeleteConfirm = () => {
        confirm({
            title: "Are you sure delete this item?",
            icon: <ExclamationCircleOutlined />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                deleteItem();
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

export default DeleteItem;
