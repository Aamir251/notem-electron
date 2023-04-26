import AddNote from "./AddNote";

const NotesList = ({ allNotes }) => {
    
   

    return <ul>
        {
            allNotes.map(note => <NoteSelector key={note.id} note={note} />)
        }
    </ul>
}

export default NotesList;

const NoteSelector = ({ note }) => {
    return <li>
        {note.noteTitle}
    </li>
}