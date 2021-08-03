import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { StrategyContext } from "../providers/stratProvider"
import { MapContext } from "../providers/mapProvider"
import { useParams } from "react-router-dom"
import { OperatorContext } from "../providers/operatorProvider"
import { SiteContext } from "../providers/siteProvider"
import "./form.css"

export const StratForm = () => {
    const { addStrategies, updateStrategies, getStrategies, getStrategiesById } = useContext(StrategyContext)
    const { maps, getMaps, getMapsById } = useContext(MapContext)
    const { sites, getSites, getSitesById } = useContext(SiteContext)
    const { operators, getOperators, getOperatorsById } = useContext(OperatorContext)

    const [strategy, setStrategies] = useState({
        mapId: "",  
        siteId: "",
        userId: "",
        sideId: "",
    });

    const [selectedOp, setSelectedOp] = useState([])
    const [selectedOps, setSelectedOps] = useState([])

    const newStrategy = { ...strategy }
    console.log(newStrategy)

    const [foundMap, setFoundMap] = useState({})
    const [foundSite, setFoundSite] = useState({})

    useEffect(() => {
        getStrategies()
        .then(getMaps())
        .then(getSites())
        .then(getOperators())
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
            event.preventDefault()
            let selectedMap = event.target.value
            
            if (event.target.id.includes("mapId")) {
                selectedMap = parseInt(selectedMap)
            }
            newStrategy[event.target.id] = selectedMap
            setStrategies(newStrategy)
            
            const foundMap = maps.find(m => newStrategy.mapId === m.id)
            setFoundMap(foundMap)
        }
        
        const handleSelectedSite = (event) => {
            event.preventDefault()
            let selectedSite = event.target.value
            
            if (event.target.id.includes("siteId")) {
                selectedSite = parseInt(selectedSite)
            }
            newStrategy[event.target.id] = selectedSite
            setStrategies(newStrategy)
            
            const foundSite = sites.find(s => newStrategy.siteId === s.id)
            setFoundSite(foundSite)
        }
        
        const handleSelectedSide = (event) => {
            event.preventDefault()
            let selectedSide = event.target.value
            
            if (event.target.id.includes("sideId")) {
                selectedSide = parseInt(selectedSide)
            }
            newStrategy[event.target.id] = selectedSide
            setStrategies(newStrategy)
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
                            return <button type="radio" value={s.id} name="siteId" id="siteId" onClick={handleSelectedSite}>{s.name} </button> 
                        }
                    })}
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="selectedSiteImg">
                    {foundSite ? <img className="selectedSite" src={foundSite.blueprint}  alt=""/> : "" } 
                </div>
            </fieldset>
            <fieldset> 
                <div className="form-group">
                    <label htmlFor="operatorSide">Atk Strategy or Def</label>
                    <button type="radio" value="1" name="sideId" id="sideId" onClick={handleSelectedSide}>ATK</button>
                    <button type="radio" value="2" name="sideId" id="sideId" onClick={handleSelectedSide}>DEF</button>
                        <div className="operators">
                        {operators.map(o => {
                            if (o.side === newStrategy.sideId)
                            return <button><img src={o.img} alt={o.name} className="opIcon" /></button> //<button type="radio" value={o.id} name={o.name}>{o.name}</button> 
                        })}
                        </div>
                </div>
            </fieldset>
        </form>
    )
}

