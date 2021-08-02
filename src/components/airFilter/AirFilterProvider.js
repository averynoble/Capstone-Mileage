import React, { useState, createContext } from "react"

export const AirFilterContext = createContext()
export const AirFilterProvider = (props) => {
    const [airFilters, setAirFilters] = useState([])

    const getAirFilters = () => {
        return fetch("http://localhost:8088/airFilters?_expand=brand")
        .then(res => res.json())
        .then(setAirFilters)
    }

    const addAirFilter = airFilter => {
        return fetch("http://localhost:8088/airFilters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(airFilter)
        })
        .then(response => response.json())
    }

    return (
        <AirFilterContext.Provider value={{
            airFilters, getAirFilters, addAirFilter
        }}>
            {props.children}
        </AirFilterContext.Provider>
    )
}