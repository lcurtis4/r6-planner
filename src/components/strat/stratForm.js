import React, { useContext, useEffect, useState } from "react"

import { StrategyContext } from "../providers/stratProvider"
import { MapContext } from "../providers/mapProvider"
import { OperatorContext } from "../providers/operatorProvider"
import { SiteContext } from "../providers/siteProvider"
import "./form.css"

export const StratForm = () => {
    const { getStrategies} = useContext(StrategyContext)
    const { maps, getMaps } = useContext(MapContext)
    const { sites, getSites} = useContext(SiteContext)
    const { operators, getOperators, selectedOperators, getSelectedOperators } = useContext(OperatorContext)

    const [strategy, setStrategies] = useState({
        mapId: "",  
        siteId: "",
        sideId: "",
    });

    const newStrategy = { ...strategy }
    
    const [selectedOps, setSelectedOps] = useState([])

    
    const [foundMap, setFoundMap] = useState({})
    const [foundSite, setFoundSite] = useState({})
    
    useEffect(() => {
        getStrategies()
        .then(getMaps())
        .then(getSites())
        .then(getOperators())
        .then(getSelectedOperators())
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleSelectedOp = event => {
        //event.preventDefault() 
        let selectedOp = parseInt(event.target.id)
        console.log("selectedOp",selectedOp)
        
        const foundOp = operators.find(o => selectedOp === o.id)

        const newSelectedOps = [...selectedOps]
        newSelectedOps.push(foundOp)

        setSelectedOps(newSelectedOps)
        console.log("newSelectedOps",newSelectedOps)
    }
        
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
            console.log(selectedMap)
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
        <>
            <h2 className="strategyFormTitle">New Strategy</h2>
            <>
                <div className="mapSelection">
                    <label htmlFor="selectedMap" className="siteText">1. Choose a Map to Begin</label>
                    <select name="mapId" id="mapId" className="siteButton" value={strategy.mapId} onChange={handleSelectedMap}>
                        <option value="0">Select A Map</option>
                        {maps.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                            ))
                        }
                    </select>
                </div>
            <>
                <div className="selectedMapImg">
                    {foundMap ? <img className="selectedMap" src={foundMap.img}  alt=""/> : "" } 
                </div>
            </>
            <>
                <div className="siteSelection">
                    <label htmlFor="siteSelection">2. Choose a Site:</label>
                    {sites.map(s => {
                        if (s.mapId === foundMap.id) {
                            return <button type="radio" value={s.id} name="siteId" id="siteId" key={s.id} onClick={handleSelectedSite}>{s.name} </button> 
                        }
                    })}
                    
                </div>
            </>
            <>
                <div className="selectedSiteImg">
                    {foundSite ? <img className="selectedSite" src={foundSite.blueprint}  alt=""/> : "" } 
                </div>
            </>
            <> 
                <div className="operatorSelection" >
                    <label className="operatorSelectionText" htmlFor="operatorSide">3. Atk Operators or Def</label>
                    <button type="radio" value="1" name="sideId" id="sideId" key="1" onClick={handleSelectedSide}>ATK</button>
                    <button type="radio" value="2" name="sideId" id="sideId" key="2" onClick={handleSelectedSide}>DEF</button>
                    <div className="operators">
                        {operators.map(o => {
                            if (o.side === newStrategy.sideId) {
                            return <img src={o.img}  alt={o.name} id={o.id} className="opIcon" key={o.id} onClick={handleSelectedOp}/>
                        }})}
                    </div>
                    <div className="confirm">
                        <label className="operatorSelectionConfirmText" htmlFor="confirmOp">4. Confirm Selected Operators</label>
                        <button type="radio" value="1" name="confirmOps" id="confirm">Confirm</button>  
                    </div>
                    
                </div>
            </>
            <>
                <div className="roleDescription" >
                    <label className="operatorRoleDescriptionText" htmlFor="roleDescription">5. Describe Each Selected Operators Role:</label>
                    {selectedOps.map(o => {
                        return (
                        <div key={o.id} >
                            <img src={o.img} alt="" className="opIcon" />
                            <input type="text" className="operatorRole" placeholder="Insert Operator Role Description here" />
                        </div>
                        )
                    })}
                        
                </div>
            </>
            <>
                <div className="saveButton">
                    <button type="radio" className="saveButton" id="save">Save Strategy</button>
                </div>
            </>
        </>
    </>
    )
}
