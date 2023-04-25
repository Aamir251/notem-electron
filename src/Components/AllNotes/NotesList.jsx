import AddNote from "./AddNote";

const NotesList = ({ setShowNoteEditor, allNotes }) => {
    
    if(allNotes.length === 0) {
        return <div className="flex flex-col items-center h-full justify-between py-4">
            <h3>No Notes Found</h3>
            

            <AddNote setShowNoteEditor={setShowNoteEditor} />
        </div>
    }

    return <ul>
        All Notes here
    </ul>
}

export default NotesList;