import Header from '@editorjs/header'; 
import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef, useState } from 'react';
import { handleCreateNote, handleSaveNote, hideMultipleEditors } from '../utils';
import { useAuth } from '../../Context/AuthContext';
import { useParams } from 'react-router-dom';

const NoteEditor = ({ isNewNote, setShowNoteEditor, getNotes }) => {
    const { currentUser } = useAuth()
    const EDITTOR_HOLDER_ID = 'NOTE_EDITOR';
    let noteTitleRef = useRef('')
    const ejInstance = useRef();
    const editorRef = useRef(null)

    const [editorData, setEditorData] = useState()
    let isSaved = true;
    let timeoutId;
    // This will run only once
    useEffect(() => {
        if (!ejInstance.current) {
            initEditor();
          }
          return () => {
            clearTimeout(timeoutId)
            // ejInstance.current.destroy();
            ejInstance.current = null;
          }
    }, []);
    // useEffect(() => {
      
    //   console.log("Updated Data ", {...editorData, noteTitle : noteTitleRef.current.value})
    // },[editorData])

    const params = useParams()
    const { notebookId, sectionId } = params;

    const onSaveNote = async () => {
        
        try {
            await handleCreateNote({
                ...editorData,
                noteTitle : noteTitleRef.current.value
            }, currentUser.email, notebookId, sectionId )
            setShowNoteEditor(false)
            getNotes()

        } catch (error) {
            console.error("Error Saving ", error.message)
        }
    }
    
    const initEditor = async () => {
        const editor = new EditorJS({
            placeholder : "Start typing a note",
            holder: EDITTOR_HOLDER_ID,
            logLevel: "ERROR",
            data: editorData,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                isSaved = false;
                let content = await editor.saver.save();
                // Put your logic here to save this data to your DB
                setEditorData(content);
            },
            autofocus: true,
            tools: { 
                header: {
                    class : Header,
                    inlineToolbar : true,
                },
                
            }, 
        });
        
        try {
            await editor.isReady;
            timeoutId = setTimeout(() => {
                hideMultipleEditors(editorRef.current)
            }, 50)

        } catch (error) {
            console.log("error ", error.message);
        }
      };
    return <div className="absolute bg-white w-full h-full top-0 left-0">
        <div className='relative newNote-editor'>
            <button onClick={() => setShowNoteEditor(false) }>Close</button>
            <div className="h-full wrapper overflow-y-scroll px-2 pb-20">
                <input
                    required
                    placeholder='Title'
                    ref={noteTitleRef}
                    className='px-4 py-3 heading-two w-full max-w-[700px] mx-auto block'

                />
                <div ref={editorRef} id={EDITTOR_HOLDER_ID}> </div>
                <button onClick={onSaveNote} className='absolute bottom-4 flex left-[50%] -translate-x-[50%] text-white semibold bg-victoria text-white px-6 py-2 rounded-sm'>Save</button>
            </div>
        </div>
    </div>
}

export default NoteEditor;