import React, { useContext, useEffect, useState } from "react" 
import { useParams } from "react-router-dom"
import { StrategyContext } from "../providers/stratProvider"


export const UserStrat = () => {
    const { getStrategiesById } = useContext(StrategyContext)

        const [strategy, setStrategy] = useState({})

        const  {strategyId} = useParams()

    useEffect(() => {
        getStrategiesById(parseInt(strategyId))
        .then((res) => {
            setStrategy(res)
        })
    }, [])

    {console.log(strategyId)}
    return (
        <section className="strategy">
            <h3 className="mapName">{strategy.map?.name}</h3>
            <img src={strategy?.site?.blueprint} alt="blueprint" />
        </section>
    )
}