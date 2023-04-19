import { createContext, useContext, useEffect, useState } from "react";
import { getNotebooksList } from "../layout/utils";
import { useAuth } from "./AuthContext";
import { useCache } from "./CacheContext";

const NotebooksContext = createContext()

export const NotebooksProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const [ notebooksList, setNotebooksList ] = useState([])
    const { notebooksCache, setNotebooksCache } = useCache()

    useEffect(() => {
        const fetchNotebooks = async () => {
            setNotebooksList([])
            if(notebooksCache.length > 0) {
                console.log("loaded notebooks from cache")
                setNotebooksList(notebooksCache)
                return
            }
            try {
                console.log("Fetching notebooks from firebase")
                const notebooksList = await getNotebooksList(currentUser.email)
                setNotebooksList(notebooksList)
                setNotebooksCache(notebooksList)
            } catch (error) {
                console.log("Error ", error.message);
            }
        }
        if(currentUser?.email) {
            fetchNotebooks()
        }
    },[currentUser, notebooksCache])

    return <NotebooksContext.Provider value={{ notebooksList, setNotebooksList }}>
        {children}
    </NotebooksContext.Provider>
}

export const useNotebooksList = () => useContext(NotebooksContext)