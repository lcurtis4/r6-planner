import React, { useContext, useEffect } from "react" 
import { useHistory } from "react-router";
import { OperatorContext } from "../providers/operatorProvider";
import { StrategyContext } from "../providers/stratProvider";
import { StratCard } from "./stratCard";
import "./list.css"

export const StratList = () => {
    const { strategies, getStrategies } = useContext(StrategyContext)
    const history = useHistory()

    useEffect(() => {
        getStrategies()
    }, [])

    return (
        <>
            <div className="stratTitle">
                <h2>Strategies</h2>
            </div>
            <button className="newStratButton" onClick={() => {history.push("/form")}}>Create New Strategy</button>
            <div className="strategiesList">
                {
                    strategies.map(s => {
                        if (s.userId == sessionStorage.getItem("r6planner_user")) {
                            return <StratCard key={s.id} strategy={s}/>
                        }
                    })
                }
            </div>
        </>
    )
}