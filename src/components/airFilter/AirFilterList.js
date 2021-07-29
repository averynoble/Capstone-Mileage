import React, { useContext, useEffect } from "react";
import { AirFilterContext } from "./AirFilterProvider";
import { AirFilterCard } from "./AirFilterCard";

export const AirFilterList = () => {

    const { airFilters, getAirFilters } = useContext(AirFilterContext)

    useEffect(() => {
        getAirFilters()
    }, [])

    return (
        <> 
            <div className="airFilters">
                {
                    airFilters.map(airFilter => {
                        return <AirFilterCard key={airFilter.id} airFilter={airFilter} />
                    })
                }
            </div>
        </>
    )
}