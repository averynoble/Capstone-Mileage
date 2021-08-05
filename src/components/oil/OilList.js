import React, { useContext, useEffect} from "react";
import { OilContext } from "./OilProvider";
import { OilCard } from "./OilCard";

export const OilList = () => {
    
    const { oils, getOils } = useContext(OilContext)
    useEffect(() => {
        getOils()
    }, [])

    return (
        <> 
            <div className="oils">
                {
                    oils.map(oil => {
                        return <OilCard key={oil.id} oil={oil} />
                    })
                }
            </div>    
        </>
    )
}