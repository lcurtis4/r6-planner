import React, { useContext, useEffect, useState } from "react"
// import { useHistory } from "react-router"
import { StrategyContext } from "../providers/stratProvider"
import { MapContext } from "../providers/mapProvider"
// import { useParams } from "react-router-dom"
import { OperatorContext } from "../providers/operatorProvider"
import { SiteContext } from "../providers/siteProvider"
import "./form.css"

export const StratForm = () => {
    const { getStrategies} = useContext(StrategyContext)
    const { maps, getMaps } = useContext(MapContext)
    const { sites, getSites} = useContext(SiteContext)
    const { operators, getOperators, selectedOperators, getSelectedOperators } = useContext(OperatorContext)

    console.log(selectedOperators)
    const [strategy, setStrategies] = useState({
        mapId: "",  
        siteId: "",
        sideId: "",
    });

    // const [selectedOp, setSelectedOp] = useState([])
    // const [selectedOps, setSelectedOps] = useState([])

    const newStrategy = { ...strategy }
    //console.log(newStrategy)

    const [foundMap, setFoundMap] = useState({})
    const [foundSite, setFoundSite] = useState({})
    console.log(foundMap)

    useEffect(() => {
        getStrategies()
        .then(getMaps())
        .then(getSites())
        .then(getOperators())
        .then(getSelectedOperators())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const [isLoading, setIsLoading] = useState(true) 
    // const { strategyId } = useParams()
    // const history = useHistory()

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
                    <button type="radio" value="1" name="sideId" id="sideId" onClick={handleSelectedSide}>ATK</button>
                    <button type="radio" value="2" name="sideId" id="sideId" onClick={handleSelectedSide}>DEF</button>
                        <div className="operators">
                            {operators.map(o => {
                                if (o.side === newStrategy.sideId)
                            return <button key={o.id}><img src={o.img} alt={o.name} className="opIcon" key={o.name} /></button>
                        })}
                        </div>
                </div>
            </>
            <>
                        <div className="roleDescription" >
                                <input type="text" className="operatorRole" id="1" placeholder="Insert Operator Role Description here" />
                                <input type="text" className="operatorRole" id="2" placeholder="Insert Operator Role Description here" />
                                <input type="text" className="operatorRole" id="3" placeholder="Insert Operator Role Description here" />
                                <input type="text" className="operatorRole" id="4" placeholder="Insert Operator Role Description here" />
                                <input type="text" className="operatorRole" id="5" placeholder="Insert Operator Role Description here" />
                        </div>
            </>
        </>
    </form>
    )
}


// <li className="form-check">
//     <input type="checkbox" id="opCheckbox" />
//     <label for="opCheckbox">
//         {/* <img src={o.img} alt={o.name} className="opIcon" /> */}
//     </label>
// </li>