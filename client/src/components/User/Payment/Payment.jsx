import React, { useState } from "react";

import Paid from "./Paid";
import Unpaid from "./Unpaid";

const Payment = () => {
    const [paid, setPaid] = useState("0");

    return (
        <React.Fragment>
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-sm-4">
                        <select
                            className="browser-default custom-select"
                            onChange={(option) => setPaid(option.target.value)}
                            required
                        >
                            <option value="0">Unpaid</option>

                            <option value="1">Paid</option>
                        </select>
                    </div>
                    <div className="col-sm-8"></div>
                </div>
                <br />
                <div>{paid === "1" ? <Paid /> : <Unpaid />}</div>
            </div>
        </React.Fragment>
    );
};

export default Payment;
