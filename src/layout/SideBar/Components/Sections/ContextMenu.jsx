import { useEffect, useRef } from "react"

const ContextMenu = ({ name, setEditName, setShowContext }) => {
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
    
    return <ul ref={contextRef}  className="absolute sectionContextMenu bg-white text-victoria z-40 top-0 -right-5">
        <li onClick={showSectionEditForm} className="context-menu-li heading-five">Edit Notebook </li>
        <li className="context-menu-li heading-five">Delete Notebook</li>
    </ul>
}

export default ContextMenu