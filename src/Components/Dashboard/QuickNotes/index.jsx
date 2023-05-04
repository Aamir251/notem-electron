import { useEffect, useState } from 'react';
import DefaultNotes from './DefaultNotes';
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore'
import { db } from '../../../firebase';
import BasicEditor from './BasicEditor';

const QuickNotes = ({ currentUser }) => {
    // if no quick notes retrieved from firebase, we show default notes
    const [ notes, setNotes ] = useState(null);
    useEffect(() => {
        const fetchQuickNotes = async () => {
            try {
                const docRef = doc(db, "usersDocs", currentUser.email)
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()) {
                    const { dashboardNotes : notesFromDb } = docSnap.data() 
                    if(!notesFromDb || notesFromDb === '') {
                        throw Error("No notes Found")
                    }
                    setNotes(notesFromDb)
                }
                
            } catch (error) {
                console.log("Error -  ",error);
            } 
        }

        fetchQuickNotes();

    },[])
    return (
        <div className="container">
            <div className="bg-titan-white-light p-4 rounded-sm translate-y-7 max-w-[900px] mr-auto">
            <div className="flex gap-x-2 items-center">
                <img 
                    src="/images/icons/notes-pin.svg"
                    alt="Quick Notes"
                    className="w-6 h-6"
                />
                <h4 className="text-victoria uppercase semibold">Quick Notes</h4>
            </div>
            
            <div className='text-kimberly mt-5 heading-five h-44'>
                <BasicEditor email={currentUser.email} notes={notes} />
            </div>
        </div>
        </div>
    )
}

export default QuickNotes