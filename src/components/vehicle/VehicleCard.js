import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { VehicleContext } from "./VehicleProvider"

export const VehicleCard = ({ vehicle }) => {
    const { deleteVehicle } = useContext(VehicleContext)
    const history = useHistory()

    const vehicleDelete = () => {
        deleteVehicle(vehicle.id)
        .then(() => {
            history.push("/")
        })
    }

    return (
        <section className="vehicle">
            <div className="vehicle__make">{vehicle.make}</div>
            <div className="vehicle__model">{vehicle.model}</div>
            <div className="vehicle__year">{vehicle.year}</div>
            <div className="vehicle__startingMileage">{vehicle.startingMileage}</div>
            <div className="vehicle__oilId">{vehicle.oilId}</div>
            <div className="vehicle__tiresId">{vehicle.tiresId}</div>
            <div className="vehicle__airFilterId">{vehicle.airFilterId}</div>

            <button onClick={vehicleDelete}>Delete Vehicle</button>
            <button onClick={() => {
                history.push(`/vehicles/edit/${vehicle.id}`)
            }}>Edit 
            </button>
        </section>
    )
}