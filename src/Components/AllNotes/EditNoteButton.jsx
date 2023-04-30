const EditNoteButton = ({ setIsNewNote, setShowNoteEditor }) => {
    const handleClick = () => {
        setIsNewNote(false)
        setShowNoteEditor(true)
    }
    return (
        <button onClick={handleClick} className="px-4 py-2 bg-white border border-victoria semibold">
            Edit Note
        </button>
    )
}

export default EditNoteButton;