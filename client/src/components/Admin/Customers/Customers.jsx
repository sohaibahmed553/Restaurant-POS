import React, { useEffect, useState } from "react";
import axios from "axios";

import { message } from "antd";

import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";

const Customers = (props) => {
    const [customers, setCustomers] = useState([]);

    //for a new customer
    const [customername, setCustomername] = useState("");
    const [contact, setContact] = useState("");
    const [specialdiscount, setSpecialdiscount] = useState("");

    const loadCustomers = async () => {
        await axios.get("/api/customers").then((res) => {
            setCustomers(res.data);
        });
    };

    const addNewCustomer = async (e) => {
        e.preventDefault();
        await axios
            .post("/api/customers/", {
                customername,
                contact,
                specialdiscount,
            })
            .then((res) => {
                message.success("Customer added");
                loadCustomers();
                setCustomername("");
                setContact("");
                setSpecialdiscount("");
            })
            .catch((err) => {
                message.error(err.response.data.errors[0].msg);
            });
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return (
        <React.Fragment>
            <br />
            <div className="container">
                <form onSubmit={addNewCustomer}>
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-3">
                            <input
                                className="form-control w-100"
                                type="text"
                                placeholder="Customer Name"
                                value={customername}
                                onChange={(e) =>
                                    setCustomername(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-sm-3">
                            <input
                                className="form-control w-100"
                                type="tel"
                                placeholder="contact"
                                value={contact}
                                pattern="[0-9]{11}"
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-3">
                            <input
                                className="form-control w-100"
                                type="number"
                                placeholder="Special Discount"
                                value={specialdiscount}
                                min="0"
                                max="100"
                                onChange={(e) =>
                                    setSpecialdiscount(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="col-lg-3 d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-dark btn-sm w-75"
                            >
                                Add
                            </button>
                        </div>
                    </div>{" "}
                </form>
                <br />
                <table className="table table-hover table-fixed">
                    <thead>
                        <tr className="table-secondary">
                            <th className="font-weight-bold">Sr No</th>
                            <th className="font-weight-bold">Customer Name</th>
                            <th className="font-weight-bold">Contact</th>
                            <th className="font-weight-bold">
                                Special Discount
                            </th>
                            <th className="font-weight-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{customer.customername}</td>
                                <td>{customer.contact}</td>
                                <td>{customer.specialdiscount}%</td>
                                <td>
                                    <DeleteCustomer
                                        id={customer._id}
                                        loadCustomers={loadCustomers}
                                    />
                                    <EditCustomer
                                        customer={customer}
                                        loadCustomers={loadCustomers}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default Customers;
