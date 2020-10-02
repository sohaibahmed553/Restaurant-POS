import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "antd/dist/antd.css";

import Login from "./components/Login";
import User from "../src/components/User/User";
import Admin from "../src/components/Admin/Admin";
import UserRoute from "./components/Routing/UserRoute";
import AdminRoute from "./components/Routing/AdminRoute";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <UserRoute path="/user" component={User} />
                <AdminRoute path="/admin" component={Admin} />
            </Switch>
        </Router>
    );
}

export default App;
