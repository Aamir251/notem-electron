const AddNote = ({ setShowNoteEditor }) => {
    const handleClick = () => {
        setShowNoteEditor(true)
    }
    return <button onClick={handleClick} className="block bg-victoria h-10 rounded-sm text-white">
        <span className="block w-[150px] semibold">
            Add Note
        </span>
        
    </button>
}

export default AddNote;