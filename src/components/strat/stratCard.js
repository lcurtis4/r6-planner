import React from "react"
import { useHistory } from "react-router"

export const StratCard = ({ strat }) => {
    const history = useHistory() 

    return (
        <section className="strat">
            <section className="startList">
                <h3 className="stratMap">strategy name</h3>
            </section>
        </section>
    )
}