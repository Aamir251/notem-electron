import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useLocation, useParams } from "react-router-dom";
import { fetchNotes } from "../Components/utils";

const NotesContext = createContext()

export const NotesProvider = ({ children }) => {

    const { currentUser } = useAuth()
    const params = useParams()
    // const location = useLocation()
    const [ loadingNotes, setLoadingNotes ] = useState(true)
    const [ allNotes, setAllNotes ] = useState([])
    const [ isNewNote, setIsNewNote  ] = useState(false)
    const [ showNoteEditor, setShowNoteEditor ] = useState(false)
    const [ selectedNote, setSelectedNote ] = useState(null)

    const getNotes = async (notebookId, sectionId) => {
        setLoadingNotes(true)
        setAllNotes([])
        try {
            const resp = await fetchNotes(currentUser.email, notebookId, sectionId)
            setAllNotes(resp)
        } catch (error) {
            // TODO - ADD TOAST HERE
            console.error("Error fetching Notes ", error.message)
            setAllNotes(false)
        } finally {
            setLoadingNotes(false)
        }
    }

    useEffect(() => {
        if(allNotes.length > 0 ) {
            setSelectedNote(allNotes[0])
        } else {
            setSelectedNote(null)
        }
    },[allNotes])


    // useEffect(() => {
    //     setShowNoteEditor(false)
    // },[location.pathname])

    return <NotesContext.Provider
        value={{
            loadingNotes,
            allNotes,
            isNewNote,
            setIsNewNote,
            showNoteEditor,
            setShowNoteEditor,
            getNotes,
            selectedNote,
            setSelectedNote
        }}
    >
        {children}
    </NotesContext.Provider>
}

export default NotesProvider;


export const useNotes = () => useContext(NotesContext)
