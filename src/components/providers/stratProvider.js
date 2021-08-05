import React, { useState, createContext } from "react" 

export const StrategyContext = createContext() 

export const StrategyProvider = (props) => {
    const [strategies, setStrategies] = useState([])

    const getStrategies = () => {
        return fetch("http://localhost:8088/strategies?_expand=map&_expand=site")
        .then(res => res.json())
        .then(setStrategies)
    }
    const getStrategiesById = (id) => {
        return fetch(`http://localhost:8088/strategies/${id}?_expand=map&_expand=site`)
        .then(res => res.json())
    }
    
    const addStrategy = strategyObj => {
        return fetch("http://localhost:8088/strategies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strategyObj)
        })
        .then(res => res.json())
        .then((newStrat) => {
            getStrategies()
            return newStrat
    })}

    const deleteStrategy = strategyId => {
        return fetch(`http://localhost:8088/strategies/${strategyId}`, {
            method: "DELETE"
        })
            .then(getStrategies)
    }

    const updateStrategy = strategy => {
        return fetch(`http://localhost:8088/strategies/${strategy.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strategy)
        })
        .then(getStrategies)
    }

    return( 
        <StrategyContext.Provider value={{
            strategies, getStrategies, getStrategiesById, addStrategy, deleteStrategy, updateStrategy
        }}>
            {props.children}
        </StrategyContext.Provider>
    )

}