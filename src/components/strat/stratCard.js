import React from "react"
import { Link } from "react-router-dom"

export const StratCard = ({ strategy }) => {

    return (
        <section className="strat">
            <section className="startList">
                <Link to={`/strategy/${strategy.id}`}>{strategy.map.name}: {strategy.site.name}</Link>
            </section>
        </section>
    )
}