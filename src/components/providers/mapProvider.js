import React, { useState, createContext } from "react" 

export const MapContext = createContext() 

export const MapProvider = (props) => {
    const [maps, setMaps] = useState([])

    const getMaps = () => {
        return fetch("http://localhost:8088/maps")
        .then(res => res.json())
        .then(setMaps)
    }
    const getMapsById = (id) => {
            return fetch(`http://localhost:8088/maps/${id}`)
            .then(res => res.json())
    }

    return( 
        <MapContext.Provider value={{
            maps, getMaps, getMapsById
        }}>
            {props.children}
        </MapContext.Provider>
    )

}