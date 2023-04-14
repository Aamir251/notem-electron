import { useRef, useState } from "react";
import { ActiveBackground, ActiveMark } from "../..";
import { Link } from "react-router-dom";
import NotebookIcon from "../../../../assets/images/NotebookIcon";
import AddNoteBookInput from "./AddNoteBookInput";
import { AddIcon } from "../../icons/AddIcon";
import NoteBooksList from "./NoteBooksList";
import { useAuth } from "../../../../Context/AuthContext";
import { getNotebooksList } from "../../../utils";
import { useCache } from "../../../../Context/CacheContext";

const NotebookSelector = ({ isActive, wrapperClass, onClick }) => {
    const ref = useRef()
    const { currentUser } = useAuth()
    const [ showInput, setShowInput ] = useState(false)
    const { sectionsCache, setSectionsCache } = useCache()
    
    const handleClick = () => {
        setShowInput((prev) => !prev)
    }

    const [ list, setList ] = useState([])

    const fetchNoteBooksList = async () => {
        setList([])
        if(sectionsCache.length > 0) {
            console.log("Fetched through cache ")
            setList(sectionsCache)
        } else {
            try {
                const list = await getNotebooksList(currentUser.email)
                setList(list)
                setSectionsCache(list)
            } catch (error) {
                console.log("Error ", error.message);
            }
        }
        
    }

    return <div className="relative w-52 mx-auto">
        <div className="flex relative">
            <div onClick={onClick} className={` relative ${wrapperClass}`}>
                <NotebookIcon  color={isActive ? "#3A3171" : "#ffffff"} />
                <p 
                    ref={ref} 
                    className={`bold ${isActive ? "text-victoria" : "text-white"} relative z-10`}
                >
                    Notebooks
                </p>
            { isActive && <ActiveMark /> }
            { isActive && <ActiveBackground /> }
            </div>
            {isActive && <span
                onClick={handleClick}
                className="absolute cursor-pointer right-1 top-3 z-10 border rounded-full ">
                <span className={`block transition duration-300 ${showInput && 'rotate-45'}`}>
                    <AddIcon />
                </span>
            </span>}
            {
                showInput && <AddNoteBookInput fetchNoteBooksList={fetchNoteBooksList} email={currentUser?.email} />
            }
            {/* <RightClickMenu /> */}

        </div>
        { isActive && <NoteBooksList
                key={fetchNoteBooksList}
                fetchNoteBooksList={fetchNoteBooksList} 
                list={list} 
                setList={setList}
                email={currentUser?.email} 
            /> }
        {/* <AddNoteBookInput /> */}
    </div>
}

export default NotebookSelector;

