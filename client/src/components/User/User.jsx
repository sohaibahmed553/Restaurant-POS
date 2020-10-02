import React from "react";

import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
} from "mdbreact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Order from "./Order/Order";
import Payment from "./Payment/Payment";
import Pay from "./Payment/Pay";
import Slip from "./Payment/Slip";
import Stock from "./Stock/Stock";
import Categories from "./Categories/Categories";
import Logout from "../Logout";

const User = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="container-fluid mt-2">
            <Router>
                <MDBNavbar
                    color="elegant-color-dark"
                    dark
                    expand="md"
                    className="font-weight-bold py-4 "
                >
                    <MDBNavbarBrand>
                        <strong className="white-text">DannysPOS</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                        <MDBNavbarNav>
                            <MDBNavItem>
                                <MDBNavLink to="/user/order">Order</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/user/payment">
                                    Payment
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/user/categories">
                                    Categories
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/user/stock">Stock</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/user/logout">
                                    Logout
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>

                <Switch>
                    <Route path="/user/order" component={Order} />
                    <Route exact path="/user/payment" component={Payment} />
                    <Route path="/user/payment/pay" component={Pay} />
                    <Route path="/user/payment/slip" component={Slip} />
                    <Route path="/user/stock" component={Stock} />
                    <Route path="/user/categories" component={Categories} />
                    <Route path="/user/logout" component={Logout} />
                </Switch>
            </Router>
        </div>
    );
};

export default User;
