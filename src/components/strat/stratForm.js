import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { StrategyContext } from "../providers/stratProvider"
import { MapContext } from "../providers/mapProvider"
import { useParams } from "react-router-dom"
import { OperatorContext } from "../providers/operatorProvider"
import { SiteContext } from "../providers/siteProvider"

export const StratForm = () => {
    const { addStrategies, updateStrategies, getStrategies, getStrategiesById } = useContext(StrategyContext)
    const { maps, getMaps, getMapsById } = useContext(MapContext)
    const { sites, getSites, getSitesById } = useContext(SiteContext)
    console.log(sites)
    // const { operators, getOperators, getOperatorsById } = useContext(OperatorContext)

    const [strategy, setStrategies] = useState({
        mapId: "", 
        img: "", 
        siteId: "",
        userId: "",

    });

    const [foundMap, setFoundMap] = useState({})
    console.log(foundMap)

    useEffect(() => {
        getStrategies()
        .then(getMaps())
        .then(getSites())
        // .then(getOperators())
    }, [])

    const [isLoading, setIsLoading] = useState(true) 
    const { strategyId } = useParams()
    const history = useHistory()

        // const handleControlledInputChange = (event) => {
        //     const newStrategy = { ...strategy }
        //     let selectedVal = event.target.value

        //     if (event.target.id.includes("Id")) {
        //         selectedVal = parseInt(selectedVal)
        //     }
        //     newStrategy[event.target.id] = selectedVal
        //     setStrategies(newStrategy)
        // }
        
        const handleSelectedMap = (event) => {
            const newStrategy = { ...strategy }
            let selectedMap = event.target.value
            
            if (event.target.id.includes("Id")) {
                selectedMap = parseInt(selectedMap)
            }
            newStrategy[event.target.id] = selectedMap
            setStrategies(newStrategy)
            
            const foundMap = maps.find(m => newStrategy.mapId === m.id)
            setFoundMap(foundMap)
        }

    return (
        <form className="strategy_Form">
            <h2 className="strategyFormTitle">New Strategy</h2>
            <fieldset> 
                <div className="form-group">
                    <label htmlFor="selectedMap">Choose a Map to Begin</label>
                    <select name="mapId" id="mapId" className="form-control" value={strategy.mapId} onChange={handleSelectedMap}>
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
            <fieldset>
                <div className="selectedMapImg">
                    {foundMap ? <img className="selectedMap" src={foundMap.img}  alt=""/> : "" } 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="siteSelection">Choose a Site:</label>
                    {sites.map(s => {
                        if (s.mapId === foundMap.id) {
                            return <button type="radio" value={s.id} name={s.name}>{s.name} </button> 
                        }
                    })}
                    
                </div>
            </fieldset>
        </form>
    )
}