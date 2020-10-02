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

import Customers from "./Customers/Customers";
import Users from "./Users/Users";
import Logout from "../Logout";

const Admin = () => {
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
                                <MDBNavLink to="/admin/customers">
                                    Customers
                                </MDBNavLink>
                            </MDBNavItem>

                            <MDBNavItem>
                                <MDBNavLink to="/admin/users">Users</MDBNavLink>
                            </MDBNavItem>

                            <MDBNavItem>
                                <MDBNavLink to="/admin/logout">
                                    Logout
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>

                <Switch>
                    <Route path="/admin/customers" component={Customers} />
                    <Route path="/admin/users" component={Users} />
                    <Route path="/admin/logout" component={Logout} />
                </Switch>
            </Router>
        </div>
    );
};

export default Admin;
