import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { StrategyContext } from "../providers/stratProvider"
import { MapContext } from "../providers/mapProvider"
import { useParams } from "react-router-dom"
import { OperatorContext } from "../providers/operatorProvider"

export const StratForm = () => {
    const { addStrategies, updateStrategies, getStrategies, getStrategiesById } = useContext(StrategyContext)
    const { maps, getMaps, getMapsById } = useContext(MapContext)
    // const { operators, getOperators, getOperatorsById } = useContext(OperatorContext)

    const [strategy, setStrategies] = useState({
        mapId: "", 
        img: "", 
        siteId: "",
        userId: ""

    });

    useEffect(() => {
        getStrategies()
        .then(getMaps())
        // .then(getOperators())
    }, [])

    const [isLoading, setIsLoading] = useState(true) 
    const { strategyId } = useParams()
    const history = useHistory()

        const handleControlledInputChange = (event) => {
            const newStrategy = { ...strategy }
            let selectedVal = event.target.value

            if (event.target.id.includes("Id")) {
                selectedVal = parseInt(selectedVal)
            }
            newStrategy[event.target.id] = selectedVal
            setStrategies(newStrategy)
        }

    return (
        <form className="strategy_Form">
            <h2 className="strategyFormTitle">New Strategy</h2>
            <fieldset> 
                <div className="form-group">
                    <label htmlFor="selectedMap">Choose a Map to Begin</label>
                    <select name="mapId" id="mapId" className="form-control" value={strategy.mapId} onChange={handleControlledInputChange}>
                        <option value="0">Select A Map</option>
                        {maps.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
        </form>
    )
}