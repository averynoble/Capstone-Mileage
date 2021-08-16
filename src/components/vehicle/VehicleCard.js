import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { VehicleContext } from "./VehicleProvider"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "../style/stylesheet.css"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  
export const VehicleCard = ({ vehicle, oil, tire, airFilter }) => {
    const { deleteVehicle, updateVehicle } = useContext(VehicleContext)
    const history = useHistory()

    let [showOilChange, setShowOilChange] = useState(false)
    let [showTireChange, setShowTireChange] = useState(false)
    let [showAirFilterChange, setShowAirFilterChange] = useState(false)

    let [showMileageForm, setShowMileageForm] = useState(false)

    let [newMileage, setNewMileage] = useState(vehicle.odometerMileage)

    let [oilMilesDif, setOilMilesDif] = useState(0)
    let [tireMilesDif, setTireMilesDif] = useState(0)
    let [airFilterMilesDif, setAirFilterMilesDif] = useState(0)

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
        let differenceMiles =  0

        switch (part.brand) {
            case oil.brand:
                differenceMiles = vehicle.odometerMileage - vehicle.oilInstallMileage
                setOilMilesDif(oil.thresholdMileage - differenceMiles);
                if (differenceMiles >= oil.thresholdMileage) {
                    setShowOilChange(true)
                };
                break;
            case tire.brand:
                differenceMiles = vehicle.odometerMileage - vehicle.tireInstallMileage
                setTireMilesDif(tire.thresholdMileage - differenceMiles);
                if (differenceMiles >= tire.thresholdMileage) {
                    setShowTireChange(true)
                };
                break;
            case airFilter.brand:
                differenceMiles = vehicle.odometerMileage - vehicle.airFilterInstallMileage
                setAirFilterMilesDif(airFilter.thresholdMileage - differenceMiles);
                if (differenceMiles >= airFilter.thresholdMileage) {
                    setShowAirFilterChange(true)
                };
                break;
            default:
                console.log(part);
        }
    }
    
    useEffect(() => {
        milesToNextChange(oil)
        milesToNextChange(tire)
        milesToNextChange(airFilter)
    }, [vehicle, oil, tire, airFilter])

    const classes = useStyles();

    return (
        <section className="vehicle">
            <div className="vehicle__make">Make: {vehicle.make}</div>
            <div className="vehicle__model">Model: {vehicle.model}</div>
            <div className="vehicle__year">Production Year: {vehicle.year}</div>
            <div className="vehicle__odometerMileage">Odometer: {vehicle.odometerMileage}</div>
            { showMileageForm ? 
                <div>
                    <input type="text" id="addedMiles" onChange={((event) => {
                        setNewMileage(event.target.value)})}>
                    </input>
                    <div className={classes.root}><Button variant="contained" color="primary" onClick={vehicleMileageUpdate}>Save</Button></div>
                </div>:   
                <div className={classes.root}>
                    <Button variant="contained" color="primary" onClick={(() => { setShowMileageForm(true) })} className="addMiles">Add Miles</Button>
                </div>
            }
            
            
            <div className="oil"><h4>Oil</h4>
                { oil && (
                    <div>
                        <div className="vehicle__oilId">Oil: {oil.brand} <button onClick={((event) => {
                           vehicle.oilInstallMileage = vehicle.odometerMileage
                            milesToNextChange(oil)
                            updateVehicle(vehicle)
                        })}>Changed Oil</button></div> 
                        <div className="vehicle__oilInstallMileage">Mileage Installed: {vehicle.oilInstallMileage}</div> 
                        <div className={`"vehicle__oilThresholdMileage ${showOilChange ? "highlight" : ""}`}>Miles till next change: {oilMilesDif}</div>
                    </div>
                    )     
                }
            </div>

            <div className="tires"><h4>Tires</h4>
                { tire && (
                    <div>
                        <div className="vehicle__tiresId">Tire Brand: {tire.brand} <button onClick={((event) => {
                            vehicle.tireInstallMileage = vehicle.odometerMileage
                            milesToNextChange(tire)
                            updateVehicle(vehicle)
                        })}>Changed Tires</button></div> 
                        <div className="vehicle__tireInstallMileage">Mileage Installed: {vehicle.tireInstallMileage}</div> 
                        <div className={`"vehicle__tireThresholdMileage ${showTireChange ? "highlight" : ""}`}>Miles till next change: {tireMilesDif}</div>
                    </div>
                )
                }
            </div>

            <div className="air_filter"><h4>Air Filter</h4>
                { airFilter && (
                    <div>
                        <div className="vehicle__airFilterId">Air Filter Brand: {airFilter.brand} <button onClick={((event) => {
                            vehicle.airFilterInstallMileage = vehicle.odometerMileage
                            milesToNextChange(airFilter)
                            updateVehicle(vehicle)
                        })}>Changed Air Filter</button></div>
                        <div className="vehicle__airFilterInstallMileage">Mileage Installed: {vehicle.airFilterInstallMileage}</div> 
                        <div className={`"vehicle__airFilterThresholdMileage ${showAirFilterChange ? "highlight" : ""}`}>Miles till next change: {airFilterMilesDif}</div>
                    </div>
                )}
            </div>

            <div className={classes.root} className="delete">
                <Button variant="contained" color="primary" onClick={vehicleDelete}>Delete Vehicle</Button>
            </div>

            <div className={classes.root} className="edit">
                <Button variant="contained" color="primary" onClick={() => {
                history.push(`/vehicles/edit/${vehicle.id}`)}}>Edit Vehicle
                </Button>
            </div>
        </section>
    )
}