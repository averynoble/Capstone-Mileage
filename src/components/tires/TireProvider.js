import React, { useState, createContext} from "react"

export const TireContext = createContext()
export const TireProvider = (props) => {
    const [tires, setTires] = useState([])

    const getTires = () => {
        return fetch("http://localhost:8088/tires?_expand=name")
        .then(res => res.json())
        .then(setTires)
    }

    const addTire = tire => {
        return fetch("http://localhost:8088/tires", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tire)
        })
        .then(response => response.json())
    }

    return (
        <TireContext.Provider value={{
            tires, getTires, addTire
        }}>
            {props.children}
        </TireContext.Provider>
    )
}