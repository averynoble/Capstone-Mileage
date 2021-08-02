import React from "react"

export const TireCard = ({ tire }) => (
    <section className="tire">
        <h5 className="tire__brand">{tire.brand}</h5>
        <div className="tire__installMileage">{tire.installMileage}</div>
        <div className="tire__thresholdMileage">{tire.thresholdMileage}</div>
    </section>
)