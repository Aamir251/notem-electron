import { useEffect, useRef, useState } from "react";
import Header from '@editorjs/header'; 
import EditorJS from '@editorjs/editorjs';
import { hideMultipleEditors } from "../../utils";
import "../css/note-viewer.css";
import { motion } from "framer-motion";

const NoteViewer = ({ selectedNote }) => {
    const EDITTOR_HOLDER_ID = 'NOTE_VIEWER';
    const ejInstance = useRef();
    const editorRef = useRef(null)
    let timeoutId;
    const [ editorData, setEditorData ] = useState(selectedNote)

    useEffect(() => {
        if (!ejInstance.current) {
            initEditor();
          }
          return () => {
            clearTimeout(timeoutId)
            ejInstance.current = null;
          }
    }, []);

   

    const initEditor = async () => {
        const editor = new EditorJS({
            readOnly : true,
            holder: EDITTOR_HOLDER_ID,
            logLevel: "ERROR",
            data: editorData,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                let content = await editor.saver.save();
                console.log("content ", content);
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
                editorRef?.current && hideMultipleEditors(editorRef.current)
            }, 50)

        } catch (error) {
            console.log("error ", error.message);
        }
        
    };
    return <motion.div initial={{
        opacity : 0
    }} 
    animate = {{
        opacity : 1,
        transition : {
            duraiton : 0.6,
            ease : "easeIn"
        }
    }}
    id={selectedNote.id} className="note-viewer bg-white-lilac h-full  w-full  px-3 py-2">
        <h1 className="heading-two">{selectedNote.noteTitle}</h1>
        <div className='relative'>
            <div ref={editorRef} id={EDITTOR_HOLDER_ID}> </div>
        </div>
    </motion.div>
}

export default NoteViewer;