import { Link } from "react-router-dom"
import Logo from "../../Components/Logo"
import DashboardIcon from "../../assets/images/DashboardIcon";
import { useState } from "react";
import { motion } from "framer-motion";
import SecondaryButton from "../../Components/Buttons/SecondaryButton";
import NotebookSelector from "./Components/NoteBooks/NotebookSelector";

const SideBar = () => {
    // 0 means dashboard is active
    // 1 means notebooks is active
    const [ active, setActive ] = useState(0);

    const wrapperClass = " w-52 rounded-sm flex items-center pl-4 gap-x-4 py-3 pr-2 mx-auto cursor-pointer"
    return <aside className="bg-victoria border border-bg-red-100 h-screen" >
        <Logo />
        <div className="space-y-8">
            <div className="flex flex-col items-center">
                <SecondaryButton>Log Out</SecondaryButton>
            </div>
            
            <DashboardSelector isActive={active===0} onClick={() => setActive(0)} wrapperClass={wrapperClass} />
            <NotebookSelector isActive={active===1} onClick={() => setActive(1)} wrapperClass={wrapperClass} />
            
        </div>
    </aside>
}

export default SideBar;


const DashboardSelector = ({ isActive, wrapperClass, onClick }) => {
    
    return <Link onClick={onClick} to="/dashboard" className={` relative ${wrapperClass}`}>
        <DashboardIcon color={isActive ? "#3A3171" : "#ffffff"} />
        <p   className={`bold ${isActive ? "text-victoria" : "text-white"} relative z-10`}>Dashboard</p>
        { isActive && <ActiveMark /> }
        { isActive && <ActiveBackground /> }

    </Link>
}





export const ActiveMark = () => {
    return <motion.span layoutId="active-mark" className="absolute block h-full w-2 bg-jacarta rounded-sm left-0 z-10">
    </motion.span>
}

export const ActiveBackground = () => {
    return (
        <motion.span layoutId="active-bg" className="block absolute w-full h-full bg-titan-white left-0 rounded-sm"></motion.span>
    )
}