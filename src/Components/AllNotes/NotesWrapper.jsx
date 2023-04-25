import AddNotesButton from "./AddNote"
import NewNoteEditor from "./NewNoteEditor"
import NotesList from "./NotesList"

const NotesWrapper = ({ showNoteEditor, allNotes, setShowNoteEditor }) => {

    return <div className="h-full relative ">
        <NotesList setShowNoteEditor={setShowNoteEditor} allNotes={allNotes} />
        
        { showNoteEditor && <NewNoteEditor setShowNoteEditor={setShowNoteEditor} /> }
        {/* <SingleNote /> */}
    </div>
}

export default NotesWrapper