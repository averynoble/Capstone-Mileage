import React, { useContext, useEffect } from "react"
import { VehicleCard } from "./VehicleCard"
import { VehicleContext } from "./VehicleProvider"

export const VehicleList = () => {

    const { vehicles, getVehicles } = useContext(VehicleContext)


    useEffect(() => {
        getVehicles()
    }, [])
    
    /*const mainDriver = vehicles.filter(vehicle => {
       return vehicle.userId === parseInt(sessionStorage.getItem("miles_user"))
    })*/

    return (
        <> 
            
            <div className="vehicles">
                {
                    vehicles.map(vehicle => {
                        return <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    })
                }    
            </div>    
        </>
    )
}