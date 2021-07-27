import { useState, createContext } from "react";

export const UserContext = createContext()
export const UserProvider = (props) => {

    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
    }
}