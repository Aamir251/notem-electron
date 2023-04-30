import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export const fetchNotes = async ( email, notebookId, sectionId ) => {
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
                noteTitle : doc.get('noteTitle'),
                time : doc.get('time'),
                version : doc.get('version'),
                blocks : doc.get('blocks')
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

export const handleCreateNote = async (data, email, notebookId, sectionId) => {

    if(data.noteTitle === '') {
        throw new Error('Title cannot be empty')
    }

    const docRef = collection(
        db,
        "usersDocs",
        email,
        "Notebooks",
        notebookId,
        "Sections",
        sectionId,
        "Notes"
    )
    await addDoc(docRef, {
        blocks : data.blocks
    })

}

export const handleUpdateNote = async (data, email, notebookId, sectionId, noteId) => {
    const docRef = doc(
        db,
        "usersDocs",
        email,
        "Notebooks",
        notebookId,
        "Sections",
        sectionId,
        "Notes",
        noteId
    )
    await updateDoc(docRef, {
        blocks : data.blocks,
        noteTitle : data.noteTitle
    })
}