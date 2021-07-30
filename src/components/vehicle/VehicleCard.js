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
            <div className="vehicle__oilBrand"> Oil: {oil.brand}, Mileage when changed: {oil.installMileage}, Miles till next change: {oil.thresholdMileage}</div>
            <div className="vehicle__tiresId"> Tire info: {tire.brand}, Mileage when changed: {tire.installMileage}, Tire radial duration: {tire.thresholdMileage}</div>
            <div className="vehicle__airFilterId">Air Filter info: {airFilter.brand}, Mileage when changed: {airFilter.installMileage}, Miles till next change: {airFilter.thresholdMileage}</div>

            <button onClick={vehicleDelete}>Delete Vehicle</button>
            <button onClick={() => {
                history.push(`/vehicles/edit/${vehicle.id}`)
            }}>Edit 
            </button>
        </section>
    )
}