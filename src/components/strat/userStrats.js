import React, { useContext, useEffect, useState } from "react" 
import { useHistory, useParams } from "react-router-dom"
import { StrategyContext } from "../providers/stratProvider"
import { OperatorContext } from "../providers/operatorProvider"


export const UserStrat = (props) => {
    const { getStrategiesById } = useContext(StrategyContext)
    const { getSelectedOperators, selectedOperators } = useContext(OperatorContext)

        const [strategy, setStrategy] = useState({})

        const  {strategyId} = useParams()

    useEffect(() => {
        getStrategiesById(parseInt(strategyId))
        .then((res) => {
            setStrategy(res)
        }).then(getSelectedOperators())
    }, [])

    return (
        <>
            <section className="strategy">
                <h3 className="mapName">{strategy.map?.name}: {strategy.site?.name}</h3>
                <img src={strategy.site?.blueprint} alt="blueprint" className="selectedSite" />
                <div className="selectedOps">
                <label className="selectedOpsCollection" htmlFor="selectedOps">
                    {selectedOperators.map(o => {
                        if (o.strategyId === parseInt(strategyId)) {
                            return (
                            <div className="selectedOps" key={o.id}>
                                <h3 className="selectedOpRole">{o.role}</h3>
                                {<img src={o.operator.img} alt="opIcon"  className="opIcon"></img>}
                            </div>
                            )
                        }
                    })}
                </label>
                </div>
            </section>
        </>
    )
}