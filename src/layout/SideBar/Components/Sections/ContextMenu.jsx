import { useEffect, useRef } from "react"
import { deleteSection } from "../../../utils"
import { useAuth } from "../../../../Context/AuthContext"

const ContextMenu = ({ setEditName, setShowContext, notebookId, sectionId, fetchSections }) => {
    const { currentUser } = useAuth()
    let contextRef = useRef(null)
    const showSectionEditForm = () => {
        setEditName(true)
        setShowContext(false)
    }
    
    const handleOutsideClick = (e) => {
        if (contextRef.current && !contextRef.current.contains(e.target)) {
            // clicked outside the context menu
            setShowContext(false)
            setEditName(false)
          }
    }
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)
    },[])

    const handleDeleteSection = async () => {
        try {
            await deleteSection(notebookId, sectionId, currentUser.email)
            fetchSections()
        } catch (error) {
            console.error("error ", error.message)
        }
    }
    
    return <ul ref={contextRef}  className="absolute sectionContextMenu bg-white text-victoria z-40 top-0 -right-5">
        <li onClick={showSectionEditForm} className="context-menu-li heading-five">Edit Section </li>
        <li onClick={handleDeleteSection} className="context-menu-li heading-five">Delete Section</li>
    </ul>
}

export default ContextMenu