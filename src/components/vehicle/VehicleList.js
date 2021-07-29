import React, { useContext, useEffect } from "react"
import { VehicleCard } from "./VehicleCard"
import { VehicleContext } from "./VehicleProvider"
import { TireContext } from "../tires/TireProvider"
import { OilContext } from "../oil/OilProvider"
import { AirFilterContext } from "../airFilter/AirFilterProvider"

export const VehicleList = () => {

    const { vehicles, getVehicles } = useContext(VehicleContext)
    const { tires, getTires} = useContext(TireContext)
    const { airFilters, getAirFilters } = useContext(AirFilterContext)
    const { oils, getOils } = useContext(OilContext)


    useEffect(() => {
        getTires()
        .then(getOils)
        .then(getAirFilters)
        .then(getVehicles)
    }, [])
    
    /*const mainDriver = vehicles.filter(vehicle => {
       return vehicle.userId === parseInt(sessionStorage.getItem("miles_user"))
    })*/

    return (
        <> 
            
            <div className="vehicles">
                {
                    vehicles.map(vehicle => {

                        const oilLevel = oils.find(o => o.id === vehicle.oilId)
                        const tire = tires.find(t => t.id === vehicle.tiresId)
                        const filter = airFilters.find(f => f.id === vehicle.airFilterId) 

                        return <VehicleCard key={vehicle.id} 
                        vehicle={vehicle} oil={oilLevel}
                        tire={tire} airFilter={filter} />
                    })
                }    
            </div>    
        </>
    )
}