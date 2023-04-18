import { useRef } from "react";
import { checkNotebookExistsAlready, createNotebook } from "../../../utils";
import { useAuth } from "../../../../Context/AuthContext";
import { useCache } from "../../../../Context/CacheContext";

const AddNoteBookInput = ({ email }) => {
    const { setNotebooksCache } = useCache()
    const inputRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const value = inputRef?.current?.value
        if(!value || value === '') return

        try {
            await checkNotebookExistsAlready(email, value)
            await createNotebook(email, value)
            console.log("Notebook created successfully");
            inputRef.current.value = ''
            setNotebooksCache([])
            
        } catch (error) {
            console.log("Error ", error.message)
        }

    }

    return (
        <div className={`absolute z-20 top-12 left-0 flex items-center justify-between bg-jacarta px-2 w-full py-1 mx-auto mt-2 rounded-sm`}>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    className="text-white bg-transparent w-full inline-block py-1.5 px-2 rounded-sm heading-five"
                    placeholder="Add NoteBook"
                />
            </form>
            {/* <span className="inline-block cursor-pointer">Create</span> */}
        </div>
    )
}

export default AddNoteBookInput;