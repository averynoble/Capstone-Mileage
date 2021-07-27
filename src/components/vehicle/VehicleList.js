import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { VehicleCard } from "./VehicleCard"
import { VehicleContext } from "./VehicleProvider"
import { FriendContext } from "./friends/FriendsProvider"

export const VehicleList = () => {

    const { vehicles, getVehicles } = useContext(VehicleContext)
    const { friends, getFriends } = useContext(FriendContext)
    const history = useHistory();

    useEffect(() => {
        getVehicles()
    }, [])

    return (
        <> 
            <button onClick={() => {history.push("/vehicles/create")}}>
                New Vehicle
            </button>

            <div className="vehicles">
                {
                    vehicles.filter((vehicle) => {
                        return parseInt(sessionStorage.getItem("miles_user")) === vehicle.userId
                    }).map(vehicle => {
                        const friend = friends.find(f => f.id === vehicle.userId)

                        return <VehicleCard key={vehicle.id} vehicle={vehicle} friend={friend} />
                    })
                }    
            </div>    
        </>
    )
}