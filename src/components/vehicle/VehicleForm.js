import React, {useContext, useEffect, useState} from "react"
import { VehicleContext } from "./VehicleProvider"
import { useHistory, useParams } from "react-router-dom"

export const VehicleForm = () => {
    const { addVehicle, getVehicleById, updateVehicle } = useContext(VehicleContext)

    const [vehicle, setVehicle] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const {vehicleId} = useParams()
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        const newVehicle = { ...vehicle }

        newVehicle[event.target.id] = event.target.value

        setVehicle(newVehicle)
    }

    const handleSaveVehicle = () => {
        if (vehicle.vehicleModel && vehicle.vehicleMake === null) {
            window.alert("Please fill out vehicle information")
        } else {
            setIsLoading(true)
            if (vehicleId) {
                updateVehicle({
                    id: vehicle.id,
                    make: vehicle.make,
                    model: vehicle.model,
                    year: vehicle.year,
                    startingMileage: vehicle.startingMileage,
                    oilId: parseInt(vehicle.oilId),
                    tiresId: parseInt(vehicle.tiresId),
                    airFilterId: parseInt(vehicle.airFilterId),
                    userId: vehicle.userId
                })
                .then(() => history.push("/"))
            } else {
                addVehicle({
                    make: vehicle.make,
                    model: vehicle.model,
                    year: vehicle.year,
                    startingMileage: vehicle.startingMileage,
                    oilId: parseInt(vehicle.oilId),
                    tiresId: parseInt(vehicle.tiresId),
                    airFilterId: parseInt(vehicle.airFilterId),
                    userId: parseInt(sessionStorage.getItem("miles_user"))
                })
                .then(() => history.push("/"))
            }
        }
    }

    useEffect(() => {
        if(vehicleId) {
            getVehicleById(vehicleId)
            .then(vehicle => {
                setVehicle(vehicle)
                setIsLoading(false)
            })
        }   else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="vehicleForm">
            <h2 className="vehicleForm__title">New Vehicle</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="make">Make:</label>
                    <input type="text" id="make" required autoFocus className="form-control" placeholder="Vehicle Make"
                    onChange={handleControlledInputChange} value={vehicle.make} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input type="text" id="model" required autoFocus className="form-control" placeholder="Vehicle Model"
                    onChange={handleControlledInputChange} value={vehicle.model} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input type="number" id="year" required autoFocus className="form-control" placeholder="Vehicle Year"
                    onChange={handleControlledInputChange} value={vehicle.year} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="startingMileage">Starting Mileage:</label>
                    <input type="number" id="startingMileage" required autoFocus className="form-control"
                    onChange={handleControlledInputChange} value={vehicle.startingMileage} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="oilId">Oil:</label>
                    <input type="text" id="oilId" required autoFocus className="form-control"
                    onChange={handleControlledInputChange} value={vehicle.oilId} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="tiresId">Tires:</label>
                    <input type="text" id="tiresId" required autoFocus className="form-control"
                    onChange={handleControlledInputChange} value={vehicle.tiresId} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="airFilterId">Air Filter:</label>
                    <input type="text" id="airFilterId" required autoFocus className="form-control"
                    onChange={handleControlledInputChange} value={vehicle.airFilterId} />
                </div>
            </fieldset>
            
            <button className="btn btn-primary" 
                    disabled={isLoading} 
                    onClick={handleSaveVehicle}
                >
                {vehicleId ? "Update Vehicle" : "Add Vehicle"}
            </button>
        </form>
    )
}