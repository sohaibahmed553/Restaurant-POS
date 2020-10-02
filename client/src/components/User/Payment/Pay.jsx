import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Pay = (props) => {
    const history = useHistory();

    const [orderid, setOrderid] = useState("");
    const [total, setTotal] = useState("0");
    const [cash, setCash] = useState("");
    const [discount, setDiscount] = useState("");

    useEffect(() => {
        setOrderid(props.location.state.order._id);
        let sum = 0;
        props.location.state.order.items.forEach((item) => {
            sum = sum + item.price * item.quantity;
        });
        sum = sum - sum * (props.location.state.order.specialdiscount / 100);
        setTotal(sum);
    }, [props]);

    const payOrderClick = async (e) => {
        e.preventDefault();

        let getDiscount = 0;
        if (discount.length) getDiscount = discount;

        await axios
            .put("/api/orders/pay/" + orderid, {
                cash,
                discount: getDiscount,
            })
            .then((res) => {
                localStorage.setItem("orderid", orderid);
                history.push("/user/payment/slip");

                /*
                history.push("/user/payment/slip", {
                    orderid,
                });*/
            });
    };

    const calculateBalance = (cash, total, discount) => {
        if (discount.length) {
            return parseInt(discount) + parseInt(cash - total);
        } else {
            return parseInt(0) + parseInt(cash - total);
        }
    };

    return (
        <>
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-md-8">
                        {
                            <table className="table table-hover table-fixed">
                                <thead>
                                    <tr className="table-secondary">
                                        <th className="font-weight-bold">
                                            Sr No
                                        </th>
                                        <th className="font-weight-bold">
                                            Items
                                        </th>
                                        <th className="font-weight-bold">
                                            Price
                                        </th>
                                        <th className="font-weight-bold">
                                            Quantity
                                        </th>
                                        <th className="font-weight-bold">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.location.state.order.items.map(
                                        (item, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{item.itemname}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    {item.price * item.quantity}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        }
                    </div>
                    <div className="col-md-4 d-flex flex-column  card p-5">
                        <form onSubmit={payOrderClick}>
                            <h2 className="text-center h2-responsive font-weight-bold">
                                Total
                            </h2>
                            <br />
                            <h4 className="text-center text-success">
                                {total}
                            </h4>
                            <br />
                            <input
                                className="form-control w-100"
                                type="number"
                                placeholder="Enter Cash Paid"
                                value={cash}
                                min="1"
                                onChange={(e) => setCash(e.target.value)}
                                required
                            />
                            <br />
                            <input
                                className="form-control w-100"
                                type="number"
                                placeholder="Enter Discount"
                                value={discount}
                                min="1"
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                            <br />
                            <div className="d-flex bd-highlight">
                                <h5 className="bd-highlight">
                                    Special Discount:
                                </h5>
                                <h5 className="text-success ml-auto bd-highlight">
                                    {props.location.state.order.specialdiscount}
                                    %
                                </h5>
                            </div>
                            <div className="d-flex bd-highlight">
                                <h5 className="bd-highlight">Cash:</h5>
                                <h5 className="text-success ml-auto bd-highlight">
                                    {cash.length ? cash : "0"}
                                </h5>
                            </div>
                            <div className="d-flex bd-highlight">
                                <h5 className="bd-highlight">Balance:</h5>
                                <h5 className="text-success ml-auto bd-highlight">
                                    {cash > total
                                        ? calculateBalance(
                                              cash,
                                              total,
                                              discount
                                          )
                                        : "0"}
                                </h5>
                            </div>
                            <div className="text-center">
                                <button
                                    className="btn btn-dark w-75"
                                    type="submit"
                                >
                                    Pay
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pay;
