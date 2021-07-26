import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationView";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";


export const Miles = () => (
    <> 
        <Route
            render={() => {
                if (sessionStorage.getItem("miles_user")) {
                    return (
                        <>
                            <NavBar />
                            <ApplicationViews />
                        </>
                    )   
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
);