import React, { useState } from "react";
import axios from "axios";
import { message, Radio } from "antd";

import "../css/Login.css";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [person, setPerson] = useState("0");

    const handlePersonChange = (e) => {
        setPerson(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length && password.length) {
            axios
                .post("/api/auth", {
                    username,
                    password,
                })
                .then((res) => {
                    localStorage.setItem("usertoken", res.data.token);
                    if (person === "0") props.history.push("/user/order");
                    if (person === "1") props.history.push("/admin/customers");
                })
                .catch((err) => {
                    message.error(err.response.data.errors[0].msg);
                });
        } else {
            message.error("Fill all fields");
        }
    };

    return (
        <div className="outer d-flex align-items-center justify-content-center">
            <br />
            <form
                className="text-center border border-light p-5 login-form"
                onSubmit={handleSubmit}
            >
                {" "}
                <p className="h4 mb-4">Sign in</p>
                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/*     Radio Buttons       */}
                <Radio.Group onChange={handlePersonChange} value={person}>
                    <Radio value="0">User</Radio>
                    <Radio value="1">Admin</Radio>
                </Radio.Group>
                {console.log(person)}
                <button className="btn btn-dark btn-block my-4" type="submit">
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default Login;
