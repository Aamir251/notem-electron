import { motion } from "framer-motion";
import { useNotes } from "../../Context/NotesContext";
import { useEffect, useRef, useState } from "react";

const NotesList = ({ selectedNote, allNotes }) => {
    const { setSelectedNote } = useNotes()
    return <ul className="p-2 pt-4 relative">
        {
            allNotes.map(note => <Note
                    isActive={selectedNote.id === note.id}
                    key={note.id}
                    note={note}
                    onClick={() => setSelectedNote(note)}
                />)
        }
    </ul>
}

export default NotesList;

const Note = ({ onClick, isActive, note }) => {
    const [ isHovered, setIsHovered ] = useState()
    const { setIsNewNote, setShowNoteEditor } = useNotes()
    const handleClick = () => {
        setIsNewNote(false)
        setShowNoteEditor(true)
    }
    return (
        <li
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

            onClick={onClick}
            className="cursor-pointer relative w-full bg-titan-white-light p-3 pl-4 relative h-20 flex flex-col justify-center">
        { 
            isActive && <motion.span
                layoutId="active-note"
                className="absolute w-1.5 h-full bg-victoria left-0 top-0">
            </motion.span> 
        }
        <h4 className="semibold text-victoria">{note.noteTitle}</h4>
        <div className="text-waterloo heading-five" dangerouslySetInnerHTML={{ __html : note.blocks[0].data.text }} />
        {
             isHovered && <motion.img
                onClick={handleClick}
                whileHover={{ scale : 1.1 }}                
                src="/images/icons/edit-note.svg"
                alt="edit note"
                className="absolute w-5 h-5 object-contain right-2 top-2" />
        }
    </li>
    )
}
