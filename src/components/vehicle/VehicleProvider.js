import React, {useState, createContext} from "react";

export const VehicleContext = createContext()

export const VehicleProvider = (props) => {
    const [vehicles, setVehicles] = useState([])

    const getVehicles = () => {
        return fetch("http://localhost:8088/vehicles?_expand=user")
        .then(res => res.json())
        .then(setVehicles)
    }

    const addVehicle = vehicle => {
        return fetch("http://localhost:8088/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicle)
        })
        .then(getVehicles)
    }

    const deleteVehicle = vehicleId => {
        return fetch(`http://localhost:8088/vehicles/${vehicleId}`, {
            method: "DELETE"
        })
        .then(getVehicles)
    }

    const getVehicleById = id => {
        return fetch(`http://localhost:8088/vehicles/${id}?_expand=user`)
        .then(res => res.json())
    }

    const updateVehicle = vehicle => {
        return fetch(`http://localhost:8088/vehicles/${vehicle.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicle)
        })
        .then(getVehicles)
    }

    return (
        <VehicleContext.Provider value={{
            vehicles,getVehicles, addVehicle, deleteVehicle, getVehicleById, updateVehicle
        }}>
            {props.children}
        </VehicleContext.Provider>
    )

}