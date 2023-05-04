import { useEffect } from "react";
import { useNotes } from "../../Context/NotesContext";
import Loader from "../Loader";
import NotesWrapper from "./NotesWrapper";
import { useParams } from "react-router-dom";

const AllNotes = () => {
    
    const { loadingNotes, allNotes, getNotes } = useNotes()
    const params = useParams()
    const { sectionId, notebookId } = params
    
    
    useEffect(() => {
        if(sectionId && notebookId) {
            getNotes(notebookId, sectionId )
        }
    },[sectionId, notebookId])

    return (
        <section className={`${allNotes.length > 0 && 'grid'} grid-cols-[300px_auto] relative h-full bg-victoria py-4 gap-x-2 pr-2`}>
            {
                loadingNotes ?  <div className="h-full flex items-center justify-center ">
                    <Loader  height={35} width={35} />
                </div> : <NotesWrapper
                    allNotes={allNotes}
                    getNotes={getNotes}
                />
            }
        </section>
    )
   
}

export default AllNotes;