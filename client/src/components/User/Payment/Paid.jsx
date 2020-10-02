import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Paid = (props) => {
    const history = useHistory();
    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {
        await axios.get("/api/orders/paid").then((res) => {
            setOrders(res.data);
        });
    };

    const onSlipClicked = (orderid) => {
        localStorage.setItem("orderid", orderid);
        history.push("/user/payment/slip");
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
                                    className="btn btn-dark btn-sm w-75"
                                    onClick={() => {
                                        onSlipClicked(order._id);
                                    }}
                                    /*onClick={() => {
                                        history.push("/user/payment/slip", {
                                            orderid: order._id,
                                        });
                                    }}*/
                                >
                                    Slip
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default Paid;
