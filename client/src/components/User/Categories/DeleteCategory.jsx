import React from "react";
import { Modal, message } from "antd";
import axios from "axios";

import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const DeleteCategory = (props) => {
    const deleteCategory = async () => {
        await axios.delete("/api/categories/" + props.id).then((res) => {
            message.success("Category deleted.");
            props.loadCategories();
        });
    };

    const showDeleteConfirm = () => {
        confirm({
            title: "Are you sure delete this category?",
            icon: <ExclamationCircleOutlined />,
            content: "Every Item of this category will also be deleted.",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                deleteCategory();
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

export default DeleteCategory;
