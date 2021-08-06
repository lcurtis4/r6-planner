import React, { useState, createContext } from "react" 

export const OperatorContext = createContext() 

export const OperatorProvider = (props) => {
    const [operators, setOperators] = useState([])
    const [selectedOperators, setSelectedOperators] = useState([])

    const getOperators = () => {
        return fetch("http://localhost:8088/operators")
        .then(res => res.json())
        .then(setOperators)
    }
    
    const getOperatorsById = (id) => {
            return fetch(`http://localhost:8088/operators/${id}`)
            .then(res => res.json())
    }

    const getSelectedOperators = (id) => {
        return fetch("http://localhost:8088/selectedOps?_expand=operator") 
        .then(res => res.json())
        .then(setSelectedOperators)
    }

    const addSelectedOps = selectedOpsObj => {
        return fetch("http://localhost:8088/selectedOps", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selectedOpsObj)
        })
    
    }

    return( 
        <OperatorContext.Provider value={{
            operators, getOperators, getOperatorsById, selectedOperators, getSelectedOperators, addSelectedOps
        }}>
            {props.children}
        </OperatorContext.Provider>
    )
}

