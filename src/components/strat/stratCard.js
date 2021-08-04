import React from "react"
import { useHistory } from "react-router"

export const StratCard = ({ strategy }) => {
    
    const history = useHistory() 

    return (
        <section className="strat">
            <section className="startList">
                <h3 className="stratMap">{strategy.map?.name}:{strategy.site?.name}</h3>
            </section>
        </section>
    )
}