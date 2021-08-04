import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { StrategyContext } from "../providers/stratProvider"
import { MapContext } from "../providers/mapProvider"
import { OperatorContext } from "../providers/operatorProvider"
import { SiteContext } from "../providers/siteProvider"
import "./form.css"

export const StratForm = () => {
    const { getStrategies, addStrategy, updateStrategy} = useContext(StrategyContext)
    const { maps, getMaps } = useContext(MapContext)
    const { sites, getSites} = useContext(SiteContext)
    const { operators, getOperators, getSelectedOperators } = useContext(OperatorContext)

    const [strategy, setStrategies] = useState({
        mapId: "",  
        siteId: "",
        sideId: "",
        userId: sessionStorage.getItem("r6planner_user")
    });
    const newStrategy = { ...strategy }
    
    const [selectedOps, setSelectedOps] = useState([])
    const [foundMap, setFoundMap] = useState({})
    const [foundSite, setFoundSite] = useState({})

    const { strategyId } = useParams()
    const history = useHistory(); 
    
    useEffect(() => {
        getStrategies()
        .then(getMaps())
        .then(getSites())
        .then(getOperators())
        .then(getSelectedOperators())
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
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

    const newSelectedOps = [...selectedOps]

    const handleSelectedOp = event => {
        let selectedOp = parseInt(event.target.id)
        
        const foundOp = operators.find(o => selectedOp === o.id)

        newSelectedOps.push(foundOp)

        setSelectedOps(newSelectedOps)
    }

    const handleControlledInputChange = (event) => {
        let selectedVal = event.target.value 
        
        //console.log(selectedVal)
            newSelectedOps[event.target.id] = selectedVal
            setSelectedOps(newSelectedOps)
    }

    const handleSaveStrat = (event) => {
        event.preventDefault() 
        if (strategy.mapId === "" || strategy.sideId === "" || strategy.siteId === "" ) {
            window.alert("Please fill in all fields!")
        } if (strategyId){
            updateStrategy({
                id: strategyId,
                mapId: strategy.mapId,
                siteId: strategy.siteId,
                sideId: strategy.sideId,
                userId: parseInt(strategy.userId)
            })
            .then(() => history.push("/strategies"))
        } else {
            addStrategy({
                id: strategyId, 
                mapId: strategy.mapId,
                siteId: strategy.siteId,
                sideId: strategy.sideId,
                userId: parseInt(strategy.userId)
            }).then(() => history.push("/strategies"))
        }
    }

    return (
        <>
            <h2 className="strategyFormTitle">New Strategy</h2>
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
                <div className="selectedMapImg">
                    {foundMap ? <img className="selectedMap" src={foundMap.img}  alt=""/> : "" } 
                </div>
                <div className="siteSelection">
                    <label htmlFor="siteSelection">2. Choose a Site:</label>
                    {sites.map(s => {
                        if (s.mapId === foundMap.id) {
                            return <button type="radio" value={s.id} name="siteId" id="siteId" key={s.id} onClick={handleSelectedSite}>{s.name} </button> 
                        }
                    })}
                </div>
                <div className="selectedSiteImg">
                    {foundSite ? <img className="selectedSite" src={foundSite.blueprint}  alt=""/> : "" } 
                </div>
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
                </div>
                <div className="roleDescription" >
                    <label className="operatorRoleDescriptionText" htmlFor="roleDescription">4. Describe Each Selected Operators Role:</label>
                    {selectedOps.map(o => {
                        console.log(o)
                        return (
                        <div key={o.id} className="operatorRole">
                            <img src={o.img} alt="" className="opIcon" />
                            <input type="text" id={selectedOps.role}  className="roleText" placeholder="Insert Operator Role Description here" />
                        </div>
                        )
                    })}
                        
                </div>
                <div className="saveButton">
                    <button type="radio" className="saveButton" id="save" onClick={handleSaveStrat}>Save Strategy</button>
                </div>
        </>
    )
}
