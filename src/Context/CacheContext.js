import { createContext, useContext, useState } from "react";

const CacheContext = createContext(null)
export const CacheProvider = ({ children }) => {
    const [ sectionsCache, setSectionsCache ] = useState([])
    const [ notebooksCache, setNotebooksCache ] = useState([])

    return <CacheContext.Provider 
            value={{ 
                sectionsCache, 
                setSectionsCache,
                notebooksCache,
                setNotebooksCache,
            }} 
        >
        {children}
    </CacheContext.Provider>
}


export const useCache = () => useContext(CacheContext)