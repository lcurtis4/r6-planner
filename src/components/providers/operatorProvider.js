import React, { useState, createContext } from "react" 

export const OperatorContext = createContext() 

export const OperatorProvider = (props) => {
    const [operators, setOperators] = useState([])

    const getOperators = () => {
        return fetch("http://localhost:8088/operators")
        .then(res => res.json())
        .then(setOperators)
    }
    const getOperatorsById = (id) => {
            return fetch("http://localhost:8088/operators/${id}")
            .then(res => res.json())
    }

    return( 
        <OperatorContext.Provider value={{
            operators, getOperators, getOperatorsById
        }}>
            {props.children}
        </OperatorContext.Provider>
    )
}

