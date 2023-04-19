import { useEffect, useRef } from "react"
import { updateSectionName } from "../../../utils"

const EditSectionInput = ({ notebookId, sectionDetails, email, setEditName, fetchSections }) => {
    let ref = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newName = ref.current.value;
        //  if the entered name is same as the original section name, simply return
        if(!newName || newName === '' || newName === sectionDetails.name ) {
            setEditName(false)
            return
        }
        try {
            await updateSectionName(email, notebookId, sectionDetails.id, newName )
        } catch (error) {
            console.log("Error  ", error.message);
        } finally {
            setEditName(false)
            fetchSections()
        }
    }

    useEffect(() => {
        ref.current.focus()
    },[])
    return (
        <form onSubmit={handleSubmit}>
            <input 
                ref={ref} 
                type="text"
                onBlur={() => setEditName(false)}
                defaultValue={sectionDetails.name}
                className="bg-jacarta pl-2 py-1 w-full text-white" 
            />
        </form>
    )
}

export default EditSectionInput