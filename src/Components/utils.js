import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export const fetchNotes = async ( email, notebookId, sectionId ) => {
    console.log(`email ${email}, notebookId ${notebookId} sectionId ${sectionId}`);
    const notesRef = collection(
        db,
        "usersDocs",
        email,
        "Notebooks",
        notebookId,
        "Sections",
        sectionId,
        "Notes"
    )
    
    const querySnapshot = await getDocs(notesRef)
    let pages = []
    if(querySnapshot.docs.length > 0) {
        querySnapshot.docs.forEach(doc => {
            const page = {
                id : doc.id,
                data : doc.get('data')
            }
            pages.push(page)
        })

        return [...pages]
    } else {
        throw new Error("No Pages Found")
    }
}

export const hideMultipleEditors = (ref) => {
    const toolBars = ref.querySelectorAll('.codex-editor')

    const toolBarstoHide = [...toolBars].filter((_,index) => index !== 0)
    function hide(el) {
        el.style.display = 'none'
    }

    toolBarstoHide.forEach(hide)
}
