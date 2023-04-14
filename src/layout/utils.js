import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase"

// check if a notebook already exists or not
export const checkNotebookExistsAlready = async (email, notebookName) => {
    const q = query(
        collection(
            db, 
            "usersDocs",
            email,
            "Notebooks",
            ), 
            where('name',"==",notebookName
        ));
        const querySnapshot = await getDocs(q)
        if(querySnapshot.docs.length > 0) {
            throw new Error("Notebook Already Exists")
        } else {
            return
        }


}
// create a new notebook
export const createNotebook = async (email, notebookName) => {
    await setDoc(
        doc(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebookName
        ),{
            name : notebookName
        }
    )
    
}

// get list of all notebooks
export const getNotebooksList = async (email) => {
    const q = collection( db, "usersDocs", email, "Notebooks")
    let notebooks = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        notebooks.push(doc.get('name'))
    })

    return [...notebooks]
}

// create a new section
export const createNewSection = async (email, notebook, sectionName) => {
    await addDoc(
        collection(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebook,
            "Sections",
        ),{
            name : sectionName
        }
    )

}
// check if a section alredy exists with that name or not
export const checkIfSectionExists = async (email, notebookName, sectionName ) => {
    const q = query(
        collection(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebookName,
            "Sections"
        ),
        where("name","==",sectionName 
        ))
    const querySnapshot = await getDocs(q)

    if(querySnapshot.docs.length > 0) {
        throw new Error("Section with that name already exists ")
    } else return
}

// get all sections list
export const getSectionsList = async (email, notebookName) => {
    const q = collection( db, "usersDocs", email, "Notebooks", notebookName, "Sections")
    let sections = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
        const section = {
            id : doc.id,
            name : doc.get('name')
        }
        sections.push(section)
    })

    return [...sections ]
}


// delete an entire notebook collection
export const deleteNotebook = async (email, notebookName) => {
    const q = query(
        collection(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebookName,
            "Sections"
        ))
    const querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach(async document => {
        await deleteDoc(doc(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebookName,
            "Sections",
            document.id
        ))
    })

    await deleteDoc(doc(
        db,
        "usersDocs",
        email,
        "Notebooks",
        notebookName,
    ))
}

export const generateSlug = (text) => text.toLowerCase().split(" ").join("-");

// update the name of a section
export const updateSectionName = async (email, notebookName, sectionId, newName ) => {
    const updateRef = doc(
        db,
        "usersDocs",
        email,
        "Notebooks",
        notebookName,
        "Sections",
        sectionId
    )
    await updateDoc(updateRef, {
        name : newName
    })

}