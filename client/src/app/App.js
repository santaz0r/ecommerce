import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Products from "./layouts/products";
import Dashboard from "./components/pages/Dashboard";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path={"/"} exact component={Main} />
                    <Route path={"/dashboard"} exact component={Dashboard} />
                    <Route path={"/login/:type?"} exact component={Login} />
                    <Route
                        path={"/products/:productId?"}
                        component={Products}
                    />
                </Switch>
            </AppLoader>
        </>
    );
}

export default App;
