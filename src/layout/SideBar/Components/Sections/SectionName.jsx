import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { generateSlug } from "../../../utils";
import { sectionsVariants } from "../variants";
import { motion } from "framer-motion";
import ContextMenu from "./ContextMenu";
import RightArrow from "../../icons/RIghtArrow";
import {useAuth} from "../../../../Context/AuthContext";
import EditSectionInput from "./EditSectionInput";

const SectionName = ({ notebookId, details, fetchSections }) => {
    const { currentUser } = useAuth()
    const [ isActive, setIsActive ] = useState(false)
    const [ showContext, setShowContext ] = useState(false);
    const [ editName, setEditName ] = useState(false);
    const slug = generateSlug(details.name)
    const location = useLocation()
    const path = location.pathname;
    const pathsArr = path.split("/")
    useEffect(() => {
            if(pathsArr.includes(details.id)) {
                setIsActive(true)
            } else {
                setIsActive(false)
            }
            setShowContext(false)
    },[path])

    
    
    return (
        <motion.li
            onContextMenu={() => setShowContext(true)}
            className={` relative w-full py-1   ${isActive && 'text-lilac'}`}
            variants={sectionsVariants}
        >
            <div 
                className="w-full relative pl-4 pr-3 flex items-center justify-between" 
                
            >
                {editName && isActive ? <EditSectionInput 
                        sectionDetails={details}
                        notebookId={notebookId}
                        email={currentUser.email}
                        setEditName={setEditName}
                        fetchSections={fetchSections}
                    /> :  <Link
                        to={ `/notesbooks/${notebookId}/sections/${details.id}`}
                    >
                    {details.name}
                </Link>}

                {isActive && !editName && <motion.span initial={{opacity : 0 }} animate={{opacity : 1 }} className="w-3 h-3 block" > <RightArrow /> </motion.span> }
                {isActive && <ActiveMark />}
            </div>
            {/* the context manu */}
            {showContext && isActive &&  <ContextMenu
                setEditName={setEditName}
                notebookId={notebookId}
                sectionId={details.id}
                fetchSections={fetchSections}
                setShowContext={setShowContext}
            /> }
        </motion.li>
    )
}

export default SectionName;

const ActiveMark = () => {
    return <motion.span layoutId="active-notes-mark" className="absolute h-full w-0.5 bg-[#FFABAB] rounded-sm left-0">
        
    </motion.span>
}
