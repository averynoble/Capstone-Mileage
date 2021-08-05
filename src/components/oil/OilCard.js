import React from "react"

export const OilCard = ({ oil }) => (
    <section className="oil">
        <h5 className="oil__brand">{oil.brand}</h5>
        <div className="oil__install">{oil.installMileage}</div>
        <div className="oil__threshold">{oil.thresholdMileage}</div>
    </section>
)