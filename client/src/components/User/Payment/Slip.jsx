import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";

import "../../../css/Slip.css";

const Slip = (props) => {
    const slipStyle = {
        padding: "0% 10% 0% 10%",
    };
    const [order, setOrder] = useState({});

    const calculateBalance = (cash, total, discount) => {
        return parseInt(discount) + parseInt(cash - total);
    };

    const loadOrderData = useCallback(async () => {
        const orderid = localStorage.getItem("orderid");
        axios.get("/api/orders/one/" + orderid).then((res) => {
            res.data.total =
                res.data.total -
                res.data.total * (res.data.specialdiscount / 100);
            setOrder(res.data);
        });

        /*  if (props.history.location.state) {
            axios
                .get(
                    "http://localhost:4000/api/orders/one/" +
                        props.history.location.state.orderid
                )
                .then((res) => {
                    setOrder(res.data);
                });
        }*/
    }, []);

    const onPrintClick = () => {
        window.print();
    };

    useEffect(() => {
        loadOrderData();
    }, [loadOrderData]);

    if (!order.items) {
        return null;
    }

    return (
        <React.Fragment>
            <br />
            <div className="container" style={slipStyle}>
                <div className="d-flex align-items-center flex-column bd-highlight">
                    <h4>Danny's Fast Food & Pizza</h4>
                    <h5>Reciept</h5>
                    <h5>{order.customername}</h5>
                    <h6>{order.date}</h6>
                </div>

                {
                    <table className="table table-hover table-fixed">
                        <thead>
                            <tr className="table-secondary">
                                <th className="font-weight-bold">Sr No</th>
                                <th className="font-weight-bold">Items</th>
                                <th className="font-weight-bold">Price</th>
                                <th className="font-weight-bold">Quantity</th>
                                <th className="font-weight-bold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item.itemname}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                <div className="row">
                    <div className="col-3">
                        <h5>Total:</h5>
                    </div>
                    <div className="col-3">
                        <h5>{order.total}</h5>
                    </div>
                    <div className="col-6"></div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h5>Paid:</h5>
                    </div>
                    <div className="col-3">
                        <h5>{order.cash}</h5>
                    </div>
                    <div className="col-6"></div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h5>Discount:</h5>
                    </div>
                    <div className="col-3">
                        <h5>{order.discount}</h5>
                    </div>
                    <div className="col-6"></div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h5>Special Discount:</h5>
                    </div>
                    <div className="col-3">
                        <h5>{order.specialdiscount}%</h5>
                    </div>
                    <div className="col-6"></div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <h5>Balance:</h5>
                    </div>
                    <div className="col-3">
                        <h5>
                            {calculateBalance(
                                order.cash,
                                order.total,
                                order.discount
                            )}
                        </h5>
                    </div>
                    <div className="col-6"></div>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-dark w-25 hide-on-print"
                        onClick={onPrintClick}
                    >
                        Print
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Slip;
