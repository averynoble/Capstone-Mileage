import React, { useContext, useEffect } from "react";
import { TireContext } from "./TireProvider";
import { TireCard } from "./TireCard"

export const TireList = () => {
    const { tires, getTires } = useContext(TireContext)

    useEffect(() => {
        getTires()
    }, [])

    return (
        <>
            <div className="tires">
                {
                    tires.map(tire => {
                        return <TireCard key={tire.id} tire={tire} />
                    })
                }
            </div>
        </>
    )
}