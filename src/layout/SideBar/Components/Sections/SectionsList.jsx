import { useEffect } from "react";
import Loader from "../../../../Components/Loader";
import { motion } from 'framer-motion';
import { sectionsVariants } from "../variants";

import SectionName from "./SectionName";

const SectionsList = ({ notebookName, allSections, fetchSections }) => {

    useEffect(() => {
        fetchSections()
    },[])

    return (
            allSections.length > 0 
            ? <motion.ul 
                variants={sectionsVariants}
                initial='initial'
                animate='animate'
                className="w-full mt-5 space-y-3 pl-6">
                {
                    allSections.map(section => <SectionName
                    
                        notebookName={notebookName}
                        fetchSections={fetchSections}
                        key={section.id}
                        details={section}  
                    /> )
                }
            </motion.ul> : 
            <div className='flex items-center justify-center h-20'>
                <Loader width={25} height={25} />
            </div>
    )
}

export default SectionsList;





