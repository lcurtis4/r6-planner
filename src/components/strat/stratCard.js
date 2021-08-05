import React from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

export const StratCard = ({ strategy }) => {
    
    const history = useHistory() 

    return (
        <section className="strat">
            <section className="startList">
                <Link to={`/strategy/${strategy.id}`}>{strategy.map.name}</Link>
            </section>
        </section>
    )
}