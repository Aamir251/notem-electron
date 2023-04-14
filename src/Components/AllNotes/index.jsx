import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const AllNotes = () => {
    const params = useParams();
    const [ allNotes, setAllNotes ] = useState([])
    useEffect(() => {
        const { slug } = params;
        
    },[params])
    return (
        <section className="grid grid-cols-[250px_auto] h-full">
            {
                allNotes.length ? "Notessss" : <div className="h-full flex items-center justify-center "><Loader  height={35} width={35} /></div>
            }
        </section>
    )
}

export default AllNotes;