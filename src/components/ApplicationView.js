import React from "react"
import { Route, Router } from "react-router-dom"
import { Home } from "./Miles"
import { OilList } from "./oil/OilList"
import { TireList } from "./tires/TireList"
import { VehicleList } from "./vehicle/VehicleList"
import { AirFilterList } from "./airFilter/AirFilterList"
import { OilProvider } from "./oil/OilProvider"
import { TireProvider } from "./tires/TireProvider"
import { AirFilterProvider } from "./airFilter/AirFilterProvider"
import { VehicleProvider } from "./vehicle/VehicleProvider"
import { VehicleForm } from "./vehicle/VehicleForm"

export const ApplicationViews = () => {
    return (
        <>
            {
                <VehicleProvider>
                    <TireProvider>
                        <AirFilterProvider>
                            <OilProvider>
                                <Route exact path="/">
                                    <VehicleList /> {/*Renders users home page with created vehicles*/}
                                </Route> 
                            </OilProvider>
                        </AirFilterProvider>
                    </TireProvider>

                    <Route exact path="/vehicles/create">
                        <VehicleForm />
                    </Route>

                    <Route exact path="/vehicles/edit/:vehicleId(\d+)">
                        <VehicleForm />
                    </Route>
                </VehicleProvider>
            }
        </>
    )
}