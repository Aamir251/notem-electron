import { useEffect, useRef, useState } from "react"
import { deleteNotebook, getSectionsList } from "../../../utils"
import { boxColors } from "../boxColors"
import AddSectionForm from "../AddSectionForm"
import { AnimatePresence, motion } from "framer-motion"
import { AddIcon } from "../../icons/AddIcon"
import SectionsList from "../Sections/SectionsList"
import { useNotebooksList } from "../../../../Context/NotebooksContext"
import { useCache } from "../../../../Context/CacheContext"
const NoteBooksList = ({ email }) => {
    
    const [ currentlySelected, setCurrentlySelected ] = useState(null)
    const { notebooksList } = useNotebooksList()
    console.log("Notebooks ", notebooksList);
    return (
        <ul className="w-52 mx-auto space-y-3  mt-4">
            {
                notebooksList.length > 0 && notebooksList.map((item, index) => <NotebookName
                onClick={() => setCurrentlySelected(index)}
                currentlySelected={currentlySelected}
                email={email}
                isActive={index === currentlySelected}
                index={index % 3}
                notebook={item}
                key={item} 
            /> )
            }
        </ul>
    )
}

export default NoteBooksList;

const NotebookName = ({ onClick, isActive, email, notebook, index }) => {
    const { setNotebooksCache } = useCache()
    const [ showInput, setShowInput ] = useState(false)
    const [ showContextMenu, setShowContextMenu ] = useState(true)
    
    const [ allSections, setAllSections ] = useState([])
    // addSection(email, name, 'React')
    const handleContextMenu = () => {
        setShowContextMenu(true)
    }
    const handleNotebookDelete = async () => {
        try {
            await deleteNotebook(email, notebook.id)
            console.log("Deleted notebook ", notebook.name)
            setNotebooksCache([])
        } catch (error) {
            console.log("ERRR ", error.message)
        }
    }
    
    const fetchSections = async () => {
        setAllSections([])
        try {
            const sections = await getSectionsList(email, notebook.id)
            setAllSections(sections)
            console.log("Sections ", sections)
        } catch (error) {
            console.log("Error ", error.message);
        }
    }
    useEffect(() => {
        fetchSections()
    },[])
    useEffect(() => {
        setShowContextMenu(false)
    },[isActive])
    return (
        <li onClick={onClick} className="relative block min-h-[40px]   w-full text-left text-albaster  ">
            <div className="flex relative justify-between items-center px-2 py-1.5 pt-2">
                <div onContextMenu={handleContextMenu} className="space-x-3 flex items-center w-full">
                    <span className={`inline-block w-1 h-1 bg-white z-10 ${boxColors[index]}`}></span>
                    <span className="inline-block z-10 heading-five semibold cursor-pointer">{notebook.name}</span>
                </div>
                { isActive && <motion.span
                    onClick={() => setShowInput((prev) => !prev) }
                    className={`block absolute right-1 top-2 z-10 cursor-pointer transition duration-300 ${showInput && 'rotate-45'}`}>
                        <AddIcon />
                    </motion.span>
                }

                {
                    isActive && showContextMenu && <div className="absolute bg-white -top-2 z-30 -right-5 rounded-md">
                        <ul className="text-victoria' ">
                            <li
                                className='context-menu-li' 
                                onClick={handleNotebookDelete}
                                >
                                    Delete Notebook
                            </li>
                            <li
                                className='context-menu-li'
                                onClick={() => {
                                    setShowInput(true)
                                    setShowContextMenu(false)
                                }} 
                                >
                                    Create Section
                            </li>
                        </ul>
                    </div>
                }

                {/* the active status background */}
                { isActive && <motion.span
                    layoutId="notebook-active" 
                    className="block bg-butterfly-bush w-full h-full absolute -left-0 top-0">
                </motion.span> }
            </div>

            {/* the form */}
            <AnimatePresence>
                {showInput && isActive && <AddSectionForm 
                    notebook={notebook}
                    setShowInput={setShowInput} 
                    email={email}
                    fetchSections={fetchSections}
                />}
            </AnimatePresence>

            {/* The sections Names */}
            
            { isActive && <SectionsList
                notebookId={notebook.id}
                allSections={allSections}
                fetchSections={fetchSections}
            />}
        </li>
    )
}