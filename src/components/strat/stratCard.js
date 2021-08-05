import React from "react"
import { useHistory } from "react-router"

export const StratCard = ({ strategy }) => {
    
    const history = useHistory() 

    return (
        <section className="strat">
            <section className="startList">
                <button type="radio" key={strategy.id} value={strategy.id} className="stratMap">{strategy.map?.name}:{strategy.site?.name}</button>
            </section>
        </section>
    )
}