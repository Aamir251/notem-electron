import "../../../../assets/css/basicEditor.css"
import { useEffect, useRef, useState } from "react";
import { saveQuickNote, hideMultipleEditors } from "./utils";
import Header from '@editorjs/header'; 
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
const LinkTool = require('@editorjs/link');
const Checklist = require('@editorjs/checklist');


const BasicEditor = ({ email, notes }) => {
    const EDITTOR_HOLDER_ID = 'editorjs';
    
    const ejInstance = useRef();
    const editorRef = useRef(null)

    // if notes is available load, existing note else load empty editor
    const [editorData, setEditorData] = useState(notes ?? '')
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
        try {
          await saveQuickNote(editorData, email)
        } catch (error) {
          console.log("Error ", error.message);
        }
      }

      editorData?.blocks && saveData()
    },[editorData])
    const initEditor = async () => {
        const editor = new EditorJS({
          holder: EDITTOR_HOLDER_ID,
          placeholder : "Create your quick note here",
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
            header: Header,
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
          }, 
        });

        try {
          await editor.isReady
          timeoutId = setTimeout(() => {
            hideMultipleEditors(editorRef.current)
          }, 50)
        } catch (error) {
          console.log("error ", error.message);
        }
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

        <div className="border h-full quick-note-editor overflow-scroll px-2 pb-0">
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