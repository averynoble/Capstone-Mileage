import React, {useContext, useEffect, useState} from "react"
import { VehicleContext } from "./VehicleProvider"
import { useHistory, useParams } from "react-router-dom"
import { OilContext } from "../oil/OilProvider"
import { AirFilterContext } from "../airFilter/AirFilterProvider"
import { TireContext } from "../tires/TireProvider"

export const VehicleForm = () => {
    const { addVehicle, getVehicleById, updateVehicle } = useContext(VehicleContext)
    const { oils, getOils } = useContext(OilContext)
    const { airFilters, getAirFilters } = useContext(AirFilterContext)
    const { tires, getTires } = useContext(TireContext)

    const [vehicle, setVehicle] = useState({
        make: "",
        model: "",
        year: 0,
        odometerMileage: 0,
        //oilId: 0,
        //tiresId: 0,
        //airFilterId: 0
        oilInstallMileage: 0,
        tireInstallMileage: 0,
        airFilterInstallMileage: 0
    });

    const [isLoading, setIsLoading] = useState(false)
    const {vehicleId} = useParams()
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        const newVehicle = { ...vehicle }

        newVehicle[event.target.id] = event.target.value

        setVehicle(newVehicle)
    }

    const handleSaveVehicle = (event) => {
        event.preventDefault()
        const oilId = parseInt(vehicle.oilId)
        const tireId = parseInt(vehicle.tiresId)
        const airFilterId = parseInt(vehicle.airFilterId)

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
                    odometerMileage: parseInt(vehicle.odometerMileage),
                    oilId: oilId,
                    tiresId: tireId,
                    airFilterId: airFilterId,
                    userId: vehicle.userId
                })
                .then(() => history.push("/"))
            } else {
                addVehicle({
                    make: vehicle.make,
                    model: vehicle.model,
                    year: vehicle.year,
                    odometerMileage: parseInt(vehicle.odometerMileage),
                    oilId: oilId,
                    oilInstallMileage: parseInt(vehicle.oilInstallMileage),
                    tiresId: tireId,
                    tireInstallMileage: parseInt(vehicle.tireInstallMileage),
                    airFilterId: airFilterId,
                    airFilterInstallMileage: parseInt(vehicle.airFilterInstallMileage),
                    userId: parseInt(sessionStorage.getItem("miles_user"))
                })
                .then(() => history.push("/"))
            }
        }
    }

    useEffect(() => {
        getOils()
        .then(getTires)
        .then(getAirFilters)
        .then(() => {
            
            if(vehicleId) {
            getVehicleById(vehicleId)
            .then(vehicle => {
                setVehicle(vehicle)
                setIsLoading(false)
            })
        }   else {
            setIsLoading(false)
            }
        })
    }, [])

    return (
        <form className="vehicleForm">
            <h2 className="vehicleForm__title">New Vehicle</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="make">Make: </label>
                    <input type="text" id="make" required autoFocus className="form-control" placeholder="Vehicle Make"
                    onChange={handleControlledInputChange} value={vehicle.make} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="model">Model: </label>
                    <input type="text" id="model" required autoFocus className="form-control" placeholder="Vehicle Model"
                    onChange={handleControlledInputChange} value={vehicle.model} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="year">Year: </label>
                    <input type="number" id="year" required autoFocus className="form-control" placeholder="Vehicle Year"
                    onChange={handleControlledInputChange} value={vehicle.year} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="odometerMileage">Odometer Mileage: </label>
                    <input type="number" id="odometerMileage" required autoFocus className="form-control"
                    onChange={handleControlledInputChange} value={vehicle.odometerMileage} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="oilId">Oil: </label>
                    <select name="oilId" id="oilId" className="form-control" onChange={handleControlledInputChange} value={vehicle.oilId}>
                        <option value="0">Select a Oil Type</option>
                        {oils.map(o => (
                            <option key={o.id} value={o.id}>
                                {o.brand}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="oilInstallMileage"> Odometer Reading when installed: </label>
                    <input className="number" id="oilInstallMileage" className="form-control" onChange={handleControlledInputChange} value={vehicle.oilInstallMileage} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="tiresId">Tires: </label>
                    <select type="text" id="tiresId" required autoFocus className="form-control"onChange={handleControlledInputChange} value={vehicle.tiresId}> 
                            <option value="0"> Select a Tire</option>
                            {
                                tires.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.brand}
                                    </option>
                                ))
                            }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tiresInstallMileage"> Odometer Reading when installed: </label>
                    <input className="number" id="tireInstallMileage" className="form-control" onChange={handleControlledInputChange} value={vehicle.tireInstallMileage} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="airFilterId">Air Filter: </label>
                    <select type="text" id="airFilterId" required autoFocus className="form-control"onChange={handleControlledInputChange} value={vehicle.airFilterId}> 
                            <option value="0">Select a Air Filter</option>
                            {
                                airFilters.map(a => (
                                    <option key={a.id} value={a.id}>
                                        {a.brand}
                                    </option>
                                ))
                            }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="airFilterInstallMileage"> Odometer Reading when installed: </label>
                    <input className="number" id="airFilterInstallMileage" className="form-control" onChange={handleControlledInputChange} value={vehicle.airFilterInstallMileage} />
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