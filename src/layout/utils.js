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
    await addDoc(
        collection(
            db,
            "usersDocs",
            email,
            "Notebooks",
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
        const notebook = {
            id : doc.id,
            name : doc.get('name')
        }
        notebooks.push(notebook)
    })

    return [...notebooks]
}

// create a new section
export const createNewSection = async (email, notebookId, sectionName) => {
    const resp = await addDoc(
        collection(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebookId,
            "Sections",
        ),{
            name : sectionName
        }
    )


}
// check if a section alredy exists with that name or not
export const checkIfSectionExists = async (email, notebookId, sectionName ) => {
    const q = query(
        collection(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebookId,
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
export const deleteNotebook = async (email, notebookId) => {
    const q = query(
        collection(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebookId,
            "Sections"
        ))
    const querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach(async document => {
        await deleteDoc(doc(
            db,
            "usersDocs",
            email,
            "Notebooks",
            notebookId,
            "Sections",
            document.id
        ))
    })

    await deleteDoc(doc(
        db,
        "usersDocs",
        email,
        "Notebooks",
        notebookId,
    ))
}

export const generateSlug = (text) => text.toLowerCase().split(" ").join("-");

// update the name of a section
export const updateSectionName = async (email, notebookId, sectionId, newName ) => {
    const updateRef = doc(
        db,
        "usersDocs",
        email,
        "Notebooks",
        notebookId,
        "Sections",
        sectionId
    )
    await updateDoc(updateRef, {
        name : newName
    })

}


export const deleteSection = async (notebookId, sectionId, email) => {
    const deleteRef = query(
        collection(
           db,
           "usersDocs",
           email,
           "Notebooks",
           notebookId,
           "Sections",
           sectionId,
           "Pages"
        ));

    const querySnapshot = await getDocs(deleteRef)

    if(querySnapshot.docs.length > 0) {
        querySnapshot.docs.forEach(async document => {
            await deleteDoc(doc(
                db,
                "usersDocs",
                email,
                "Notebooks",
                notebookId,
                "Sections",
                document.id
            ))
        })
    }
    await deleteDoc(doc(
        db,
        "usersDocs",
        email,
        "Notebooks",
        notebookId,
        "Sections",
        sectionId
    ))
}