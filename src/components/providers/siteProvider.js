import React, { useState, createContext } from "react" 

export const SiteContext = createContext() 

export const SiteProvider = (props) => {
    const [sites, setSites] = useState([])

    const getSites = () => {
        return fetch("http://localhost:8088/sites")
        .then(res => res.json())
        .then(setSites)
    }

    const getSitesById = (id) => {
            return fetch("http://localhost:8088/sites/${id}")
            .then(res => res.json())
    }

    return( 
        <SiteContext.Provider value={{
            sites, getSites, getSitesById
        }}>
            {props.children}
        </SiteContext.Provider>
    )
}

