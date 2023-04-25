import Header from '@editorjs/header'; 
import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef, useState } from 'react';
import { hideMultipleEditors } from '../utils';

const NewNoteEditor = ({ setShowNoteEditor }) => {
    const EDITTOR_HOLDER_ID = 'newNoteEditor';
    const [ noteTitle, setNoteTitle ] = useState('')
    const ejInstance = useRef();
    const editorRef = useRef(null)
  
    const [editorData, setEditorData] = useState()
    
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
    useEffect(() => {
      const saveData = async () => {
    //    return () => clearTimeout(timeoutId)
      }

      editorData?.blocks && saveData()
    },[editorData])
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
            
        }
      };
    return <div className="absolute bg-white w-full h-full top-0 left-0">
        <div className='relative newNote-editor'>
            <button onClick={() => setShowNoteEditor(false) }>Close</button>
            <div className="h-full wrapper overflow-y-scroll px-2 pb-20">
                <input
                    required
                    placeholder='Title'
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className='px-4 py-3 heading-two w-full max-w-[700px] mx-auto block'

                />
                <div ref={editorRef} id={EDITTOR_HOLDER_ID}> </div>
                <button className='absolute bottom-4 flex left-[50%] -translate-x-[50%] text-white semibold bg-victoria text-white px-6 py-2 rounded-sm'>Save</button>
            </div>
        </div>
    </div>
}

export default NewNoteEditor;