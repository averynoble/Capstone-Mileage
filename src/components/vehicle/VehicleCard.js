import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { VehicleContext } from "./VehicleProvider"

export const VehicleCard = ({ vehicle, oil, tire, airFilter }) => {
    const { deleteVehicle, updateVehicle } = useContext(VehicleContext)
    const history = useHistory()

    let [showMileageForm, setShowMileageForm] = useState(false)

    let [newMileage, setNewMileage] = useState(vehicle.odometerMileage)

    let [oilMilesDif, setOilMilesDif] = useState(0)

    const vehicleDelete = () => {
        deleteVehicle(vehicle.id)
        .then(() => {
            history.push("/")
        })
    }

    const vehicleMileageUpdate = () => {
        vehicle.odometerMileage = parseInt(newMileage)
        updateVehicle(vehicle)
        setShowMileageForm(false)
    }

    const milesToNextChange = (part) => {
        const differenceMiles = vehicle.odometerMileage - part.installMileage
        //differenceMiles >= part.thresholdMileage
        setOilMilesDif(oil.thresholdMileage - differenceMiles) 
    }

    useEffect(() => {
        milesToNextChange(oil)
    }, [vehicle])

    return (
        <section className="vehicle">
            <div className="vehicle__make">Make: {vehicle.make}</div>
            <div className="vehicle__model">Model: {vehicle.model}</div>
            <div className="vehicle__year">Production Year: {vehicle.year}</div>
            <div className="vehicle__odometerMileage">Odometer: {vehicle.odometerMileage}</div>
            { showMileageForm ? <div><input type="text" id="addedMiles" onChange={((event) => {
                setNewMileage(event.target.value)
            })}></input><button onClick={vehicleMileageUpdate}>Save</button></div>
            : <button onClick={(() => {
                setShowMileageForm(true)
            })} className="addMiles">add miles</button>
            }
            
            
            <div className="oil"><h4>Oil</h4>
                { oil && (
                    <div>
                        <div className="vehicle__oilId">Oil: {oil.brand}</div> 
                        <div className="vehicle__oilInstallMileage">Mileage when changed: {oil.installMileage}</div> 
                        <div className="vehicle__oilThresholdMileage">Miles till next change: {oilMilesDif}</div>
                    </div>
                    )     
                }
            </div>

            <div className="tires"><h4>Tires</h4>
                { tire && (
                    <div>
                        <div className="vehicle__tiresId">Tire Brand: {tire.brand}</div> 
                        <div className="vehicle__tireInstallMileage">Mileage Installed: {tire.installMileage}</div> 
                        <div className="vehicle__tireThresholdMileage">Miles till next change: {tire.thresholdMileage}</div>
                    </div>
                )
                }
            </div>

            <div className="air_filter"><h4>Air Filter</h4>
                { airFilter && (
                    <div>
                        <div className="vehicle__airFilterId">Air Filter Brand: {airFilter.brand}</div> 
                        <div className="vehicle__airFilterInstallMileage">Mileage Installed: {airFilter.installMileage}</div> 
                        <div className="vehicle__airFilterThresholdMileage">Miles till next change: {airFilter.thresholdMileage}</div>
                    </div>
                )}
            </div>

            <button onClick={vehicleDelete}>Delete Vehicle</button>
            <button onClick={() => {
                history.push(`/vehicles/edit/${vehicle.id}`)
            }}>Edit 
            </button>
        </section>
    )
}