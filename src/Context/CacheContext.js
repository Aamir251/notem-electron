import { createContext, useContext, useState } from "react";

const CacheContext = createContext(null)
export const CacheProvider = ({ children }) => {
    const [ sectionsCache, setSectionsCache ] = useState([])

    return <CacheContext.Provider value={{ sectionsCache, setSectionsCache}} >
        {children}
    </CacheContext.Provider>
}


export const useCache = () => useContext(CacheContext)