import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ component: Component, render, ...rest }) => {
    const [isUser, setIsUser] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState([]);

    React.useEffect(() => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
            "usertoken"
        );
        axios
            .get("/api/auth")
            .then((res) => {
                setUser(res.data);
                if (res.data.isAdmin === true) {
                    setIsUser(true);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsUser(false);
                setLoading(false);
            });
    }, []);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isUser === false && loading === false)
                    return <Redirect to="/" />;
                if (isUser === true && loading === false)
                    return Component ? (
                        <Component {...props} user={user} />
                    ) : (
                        render(props)
                    );
            }}
        />
    );
};

export default AdminRoute;
