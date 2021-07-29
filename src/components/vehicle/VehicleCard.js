import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { VehicleContext } from "./VehicleProvider"

export const VehicleCard = ({ vehicle, oil, tire, airFilter }) => {
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
            <div className="vehicle__make">Make: {vehicle.make}</div>
            <div className="vehicle__model">Model: {vehicle.model}</div>
            <div className="vehicle__year">Production Year: {vehicle.year}</div>
            <div className="vehicle__startingMileage">Mileage when created: {vehicle.startingMileage}</div>
            <div className="vehicle__oilBrand"> Oil: {oil.brand}</div>
            <div className="vehicle__tiresId"> Tire info: {tire.brand}</div>
            <div className="vehicle__airFilterId">Air Filter info: {airFilter.brand}</div>

            <button onClick={vehicleDelete}>Delete Vehicle</button>
            <button onClick={() => {
                history.push(`/vehicles/edit/${vehicle.id}`)
            }}>Edit 
            </button>
        </section>
    )
}