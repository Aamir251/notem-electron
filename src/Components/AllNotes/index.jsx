import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { useAuth } from "../../Context/AuthContext";
import { fetchNotes } from "../utils";
import NotesWrapper from "./NotesWrapper";

const AllNotes = () => {
    const { currentUser } = useAuth()
    const params = useParams();
    const [ loadingNotes, setLoadingNotes ] = useState(true)
    const [ allNotes, setAllNotes ] = useState([])
    const { notebookId, sectionId } = params;
    // console.log("params ", params);
    useEffect(() => {

        const getNotes = async () => {
            setLoadingNotes(true)
            try {
                const resp = await fetchNotes(currentUser.email, notebookId, sectionId )
                
                setAllNotes(resp)
            } catch (error) {
               console.log("ERRORRRR ", error.message);
               setAllNotes([])
            } finally {
                setLoadingNotes(false)
            }
        }

        if(currentUser?.email && notebookId && sectionId) {
            getNotes()
        }
        
    },[params, currentUser, notebookId, sectionId])

    const [ showNoteEditor, setShowNoteEditor ] = useState(false)
    
    return (
        <section className={`${allNotes.length > 0 && 'grid'} grid-cols-[250px_auto] h-full`}>
            {
                loadingNotes ?  <div className="h-full flex items-center justify-center ">
                    <Loader  height={35} width={35} />
                </div> : <NotesWrapper showNoteEditor={showNoteEditor} setShowNoteEditor={setShowNoteEditor} allNotes={allNotes} />
            }
        </section>
    )
}

export default AllNotes;