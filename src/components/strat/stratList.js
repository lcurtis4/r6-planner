import React, { useContext, useEffect } from "react" 
import { useHistory } from "react-router";
import { OperatorContext } from "../providers/operatorProvider";
import { StrategyContext } from "../providers/stratProvider";
import { StratCard } from "./stratCard";

export const StratList = () => {
    const { strategies, getStrategies } = useContext(StrategyContext)
    const { selectedOperators, getSelectedOperators } = useContext(OperatorContext)
    const history = useHistory()

    useEffect(() => {
        getStrategies()
    }, [])

    return (
        <>
            <h2>Strategies</h2>
            <button className="newStratButton" onClick={() => {history.push("/form")}}>Create New Strategy</button>
            <div className="strategiesList">
                {
                    strategies.map(s => {
                        console.log(strategies)
                        if (s.userId == sessionStorage.getItem("r6planner_user")) {
                            return <StratCard key={s.id} strategy={s}/>
                        }
                    })
                }
            </div>
        </>
    )
}