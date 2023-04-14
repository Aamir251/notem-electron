import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"

export const hideMultipleEditors = (ref) => {
    const toolBars = ref.querySelectorAll('.codex-editor')

    const toolBarstoHide = [...toolBars].filter((_,index) => index !== 0)
    function hide(el) {
        el.style.display = 'none'
    }

    toolBarstoHide.forEach(hide)
}

export const editorOptions = {
        theme: "snow",
        placeholder : "Write your quick notes here",
        modules: {
        toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ['link']
    ],

    },
}

export const saveQuickNote = async (noteObj, email) => {
    try {
        const updateRef = doc(db, "usersDocs", email)
        await updateDoc(updateRef, {
            dashboardNotes : noteObj
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
