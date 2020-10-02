import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

const Unpaid = (props) => {
    const history = useHistory();
    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {
        await axios.get("/api/orders/unpaid").then((res) => {
            setOrders(res.data);
        });
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <React.Fragment>
            <table className="table table-hover table-fixed">
                <thead>
                    <tr className="table-secondary">
                        <th className="font-weight-bold">Sr No</th>
                        <th className="font-weight-bold">Customer Name</th>
                        <th className="font-weight-bold">Items</th>
                        <th className="font-weight-bold">Type</th>
                        <th className="font-weight-bold">Total Price</th>
                        <th className="font-weight-bold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{order.customername}</td>
                            <td>{order.items.length}</td>
                            <td>{order.type}</td>
                            <td>{order.total}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-dark btn-sm w-50 "
                                    onClick={() => {
                                        history.push("/user/payment/pay", {
                                            order,
                                        });
                                    }}
                                >
                                    Pay
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default Unpaid;
