import React from "react"
import { Route, Router } from "react-router-dom"
import { Home } from "./Miles"
import { VehicleList } from "./vehicle/VehicleList"
import { VehicleProvider } from "./vehicle/VehicleProvider"
import { VehicleForm } from "./vehicle/VehicleForm"

export const ApplicationViews = () => {
    return (
        <>
            {
                <VehicleProvider>
                    <Route exact path="/">
                        <VehicleList /> {/*Renders users home page with created vehicles*/}
                    </Route> 

                    <Route exact path="/vehicles/create">
                        <VehicleForm />
                    </Route>
                </VehicleProvider>
            }
        </>
    )
}