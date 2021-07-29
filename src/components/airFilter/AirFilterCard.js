import React from "react"

export const AirFilterCard = ({ airFilter }) => (
    <section className="airFilter">
        <h5 className="airFilter__brand">{airFilter.name}</h5>
        <div className="airFilter__installMileage">{airFilter.installMileage}</div>
        <div className="airFilter__thresholdMileage">{airFilter.thresholdMileage}</div>
    </section>
)