import { createContext, useContext, useState } from "react";

const SectionsLoadingContext = createContext()

export const SectionsLoadingProvider = ({ children }) => {
    const [ sectionsLoading, setSectionsLoading ] = useState(true)

    return <SectionsLoadingContext.Provider
        value={{
            sectionsLoading,
            setSectionsLoading
        }}
    >
        {children}
    </SectionsLoadingContext.Provider>
}

export const useSectionsLoading = () => useContext(SectionsLoadingContext)