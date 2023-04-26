import { useEffect, useState } from "react"
import AddNote from "./AddNote"
import AddNotesButton from "./AddNote"
import NoteEditor from "./NoteEditor"
import NotesList from "./NotesList"
import NoteViewer from "./NoteViewer"

const NotesWrapper = ({
        isNewNote,
        setIsNewNote,
        showNoteEditor,
        allNotes,
        setShowNoteEditor,
        getNotes
    }) => {
    
    const [ selectedNote, setSelectedNote ] = useState(allNotes.length > 0 ? allNotes[0] : null)

    
    return <>
        <div className="h-full relative ">
            {
                allNotes.length > 0 ? <NotesList allNotes={allNotes} /> : <NoNotesFound 
                    setIsNewNote={setIsNewNote} 
                    setShowNoteEditor={setShowNoteEditor}
                /> 
            }

            
            { showNoteEditor && <NoteEditor
                getNotes={getNotes}
                isNewNote={isNewNote}
                setShowNoteEditor={setShowNoteEditor}
            /> }
            {/* <SingleNote /> */}
        </div>
        {
            allNotes.length > 0 && selectedNote && <div>'
                <NoteViewer selectedNote={selectedNote} />
            </div>
        }

    
    </>
}

export default NotesWrapper;


const NoNotesFound = ({ setIsNewNote, setShowNoteEditor }) => {
    return <div className="flex flex-col items-center h-full justify-between py-4">
    <h3>No Notes Found</h3>
    

    <AddNote
        setIsNewNote={setIsNewNote}
        setShowNoteEditor={setShowNoteEditor}
    />
</div>
}