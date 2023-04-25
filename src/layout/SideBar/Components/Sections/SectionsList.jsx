import { useEffect } from "react";
import Loader from "../../../../Components/Loader";
import { motion } from 'framer-motion';
import { sectionsVariants } from "../variants";

import SectionName from "./SectionName";

const SectionsList = ({ notebookId, allSections, fetchSections, sectionsLoading }) => {
    console.log(`current loading state `, sectionsLoading);
    return (
            sectionsLoading === true 
            ?  <div className='flex items-center justify-center h-20'>
                <Loader width={25} height={25} />
            </div> : <Sections 
                allSections={allSections}
                fetchSections={fetchSections}
                notebookId={notebookId}
            />
           
    )
}

export default SectionsList;

const Sections = ({ allSections, fetchSections, notebookId }) => {
    return allSections.length > 0 ? <motion.ul 
    variants={sectionsVariants}
    initial='initial'
    animate='animate'
    className="w-full mt-5 space-y-3 pl-6">
    {
        allSections.map(section => <SectionName
            fetchSections={fetchSections}
            notebookId={notebookId}
            key={section.id}
            details={section}  
        /> )
    }
</motion.ul> : "No Sections Found"
}





