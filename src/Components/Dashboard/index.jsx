import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import Heading from "./Heading"
import QuickNotes from "./QuickNotes"
import { useEffect } from "react"

const Dashboard = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    useEffect(() => {
        if(!currentUser?.email) navigate("/auth/login")
    },[])
    if(!currentUser?.email) return null
    return <>
        <div>
            <Heading />
            <QuickNotes currentUser={currentUser} />
        </div>
    </>
}

export default Dashboard