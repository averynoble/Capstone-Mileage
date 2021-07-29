import React, { useState, createContext } from "react";

export const OilContext = createContext()
export const OilProvider = (props) => {
    const [oils, setOils] = useState([])

    const getOils = () => {
        return fetch("http://localhost:8088/oils?_expand=name")
        .then(res => res.json())
        .then(setOils)
    }

    const addOil = oil => {
        return fetch("http://localhost:8088/oils", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(oil)
        })
        .then(response => response.json())
    }

    return (
        <OilContext.Provider value={{
            oils, getOils, addOil
        }}>
            {props.children}
        </OilContext.Provider>
    )
}