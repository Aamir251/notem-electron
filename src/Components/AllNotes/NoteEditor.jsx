import Header from '@editorjs/header'; 
import List from '@editorjs/list';
import EditorJS from '@editorjs/editorjs';
import Embed from '@editorjs/embed';
import { useEffect, useRef, useState } from 'react';
import { handleCreateNote, handleUpdateNote, hideMultipleEditors } from '../utils';
import { useAuth } from '../../Context/AuthContext';
import { useParams } from 'react-router-dom';
const LinkTool = require('@editorjs/link');
const Checklist = require('@editorjs/checklist');



const NoteEditor = ({ isNewNote, setShowNoteEditor, getNotes, selectedNote }) => {
    const { currentUser } = useAuth()
    const EDITTOR_HOLDER_ID = 'NOTE_EDITOR';
    const [ noteTitle, setNoteTitle ] = useState(isNewNote ? "" : selectedNote.noteTitle)
    
    const [imgUrl, setImgUrl] = useState(null);
    const ejInstance = useRef();
    const editorRef = useRef(null)
    // if isNewNote is true, it means new note is being created, so 
    // we don't load any default data. If it is false, means an existing note is 
    // being edited so we load initial data i.e. selectedNote
    const [editorData, setEditorData] = useState(isNewNote ? "" : selectedNote)
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
            if(isNewNote) {
                // means we are trying to create a new note
                await handleCreateNote({
                    ...editorData,
                    noteTitle,
                }, currentUser.email, notebookId, sectionId )
            } else {
                // we are trying to update an existing note
                await handleUpdateNote(
                    {
                        ...editorData,
                        noteTitle,
                    }, currentUser.email, notebookId, sectionId, selectedNote.id )
            }

            console.log("notes updated ");
            setShowNoteEditor(false)
            getNotes()

        } catch (error) {
            // ADD TOAST HERE
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
                linkTool: {
                    class: LinkTool,
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                },
                embed: Embed,
               
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
    return <div className="absolute bg-white w-full h-full top-0 left-0 z-30">
        <div className='relative newNote-editor'>
            <button onClick={() => setShowNoteEditor(false) }>Close</button>
            <div className="h-full wrapper overflow-y-scroll px-2 pb-20">
                <input
                    required
                    placeholder='Title'
                    onChange={(e) => setNoteTitle(e.target.value) }
                    value={noteTitle }
                    className='px-4 py-3 heading-two w-full max-w-[700px] mx-auto block'

                />
                <div ref={editorRef} id={EDITTOR_HOLDER_ID}> </div>
                <button onClick={onSaveNote} className='absolute bottom-4 flex left-[50%] -translate-x-[50%] text-white semibold bg-victoria text-white px-6 py-2 rounded-sm'>Save</button>
            </div>
        </div>
    </div>
}

export default NoteEditor;