import "../../../../assets/css/basicEditor.css"
import { useEffect, useRef, useState } from "react";
import { saveQuickNote, hideMultipleEditors } from "./utils";
import Header from '@editorjs/header'; 
import EditorJS from '@editorjs/editorjs';

const BasicEditor = ({ email, notes }) => {
    const EDITTOR_HOLDER_ID = 'editorjs';
    
    const ejInstance = useRef();
    const editorRef = useRef(null)
  
    const [editorData, setEditorData] = useState(notes)
 
    // This will run only once
    useEffect(() => {
        if (!ejInstance.current) {
            initEditor();
          }
          return () => {
            // ejInstance.current.destroy();
            ejInstance.current = null;
          }
        }, []);
        
    useEffect(() => {
      const saveData = async () => {
        try {
          await saveQuickNote(editorData, email)
        } catch (error) {
          console.log("Error ", error.message);
        }
      }

      editorData?.blocks && saveData()
    },[editorData])
    const initEditor = () => {
        const editor = new EditorJS({
          holder: EDITTOR_HOLDER_ID,
          logLevel: "ERROR",
          data: editorData,
          onReady: () => {
            ejInstance.current = editor;
            hideMultipleEditors(editorRef.current)
          },
          onChange: async () => {
            let content = await editor.saver.save();
            // Put your logic here to save this data to your DB
            setEditorData(content);
          },
          autofocus: true,
          tools: { 
            header: Header, 
          }, 
        });
      };
      return <>
        {/* <div ref={wrapperRef} className="border border-kimberly/30 h-full rounded-sm pb-2"> */}
        
        {/* <ReactQuill 
            theme="snow" 
            value={value}
            placeholder="Enter your notes"
            onChange={onChange}
            modules={{
                // toolbar : ["image"]
            }}
            /> */}

        <div className="border h-full overflow-scroll px-2 pb-0">
            <div ref={editorRef} id={EDITTOR_HOLDER_ID}> </div>
        </div>

        {/* </div> */}
        

    </>
}

export default BasicEditor;


const DEFAULT_INITIAL_DATA = {
      "time": new Date().getTime(),
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "This is my awesome editor!",
            "level": 1
          }
        },
      ]
  }