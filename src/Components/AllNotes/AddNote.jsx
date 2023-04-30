import { motion } from "framer-motion"
import { useState } from "react"

const AddNote = ({ setIsNewNote, setShowNoteEditor }) => {
    const handleClick = () => {
        setIsNewNote(true)
        setShowNoteEditor(true)
    }
    const [ isHovered, setIsHovered ] = useState(false)
    const btnClass = "flex justify-center relative items-center pb-1.5 bg-victoria w-10 h-10 heading-two rounded-full text-white"
    return <motion.button 
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale : 1.1 }} 
            onClick={handleClick}
            className={btnClass}
        >
           <span className="block">
            +
           </span>

           { isHovered && <span className="block w-max absolute heading-five text-victoria z-10 -top-10">Add New Note</span>}

    </motion.button>
}

export default AddNote;