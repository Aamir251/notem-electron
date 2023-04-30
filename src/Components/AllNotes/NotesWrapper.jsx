import { useEffect, useState } from "react"
import AddNote from "./AddNote"
import AddNotesButton from "./AddNote"
import NoteEditor from "./NoteEditor"
import NotesList from "./NotesList"
import NoteViewer from "./NoteViewer"
import { motion } from "framer-motion"
import EditNoteButton from "./EditNoteButton"
import { useNotes } from "../../Context/NotesContext"

const NotesWrapper = ({
        allNotes,
        getNotes
    }) => {
    
    const { selectedNote,
        setIsNewNote,
        setShowNoteEditor,
        showNoteEditor,
        isNewNote 
    } = useNotes()
   
    return <>
        <div className="h-full bg-white-lilac">
            {
                allNotes.length > 0 && selectedNote ? <NotesList
                    selectedNote={selectedNote}
                    allNotes={allNotes}

                /> : <NoNotesFound 
                    setIsNewNote={setIsNewNote} 
                    setShowNoteEditor={setShowNoteEditor}
                /> 
            }

            
            { showNoteEditor && selectedNote && <NoteEditor
                selectedNote={selectedNote}
                getNotes={getNotes}
                isNewNote={isNewNote}
                setShowNoteEditor={setShowNoteEditor}
            /> }
            {/* <SingleNote /> */}
        </div>
        {
            allNotes.length > 0 && selectedNote && <div>
                <NoteViewer selectedNote={selectedNote} />
            </div>
        }

        {
            allNotes.length && <div className="absolute bottom-10 right-10 flex gap-x-3">
                <AddNote setIsNewNote={setIsNewNote} setShowNoteEditor={setShowNoteEditor} />
            </div>
        }
    
    </>
    
}

export default NotesWrapper;


const NoNotesFound = ({ setIsNewNote, setShowNoteEditor }) => {
    return <motion.div initial={{ opacity : 0 }} animate={{ opacity : 1, transition : { ease : "easeOut", duration : 0.6 } }} className="flex flex-col items-center h-full justify-between py-10">
    <h3 className="text-victoria heading-two">No Notes Found</h3>
    <img
        src="/images/no-notes-illustration.svg"
        alt="No Notes Found"
        className="w-full max-w-[300px]"
    />

    <AddNote
        setIsNewNote={setIsNewNote}
        setShowNoteEditor={setShowNoteEditor}
    />
</motion.div>
}