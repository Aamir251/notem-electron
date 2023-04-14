import { motion } from 'framer-motion';
import { checkIfSectionExists, createNewSection } from '../../utils';
import { useEffect, useRef } from 'react';

const AddSectionForm = ({ notebookName, setShowInput, email, fetchSections }) => {

    const inputRef = useRef(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        let sectionName = inputRef.current.value
        if(!inputRef || sectionName === '') return
        try {
            // check if a section with that sectionName already exists
            // if it exists, it would throw an error
            await checkIfSectionExists(email, notebookName, sectionName)
            await createNewSection(email, notebookName, sectionName)

            inputRef.current.value = ''

            setShowInput(false)
            fetchSections()
        } catch (error) {
            console.log("Error ", error.message);
        }
    }

    useEffect(() => {
        setShowInput(true)
        return () => setShowInput(false)
    },[])

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ x : "-100%", opacity : 0 }}
            animate={{ x : 0, opacity : 1 }}
            exit={{ x : "-100%", opacity : 0 }}
            className="absolute top-12 bg-jacarta left-0 w-48 mx-auto z-30">
            <input
                ref={inputRef}
                className="w-full px-2 py-1.5 bg-jacarta heading-five"
                type="text"
                placeholder="Section Name"
            />
        </motion.form>
    )
}

export default AddSectionForm