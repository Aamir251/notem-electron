import { Outlet, useNavigate } from "react-router-dom"
import AuthSideBar from "./AuthSideBar";
import { useAuth } from "../../Context/AuthContext";
import { useEffect } from "react";

const Authentication = () => {
    const { currentUser } = useAuth()

    const navigate = useNavigate()
    useEffect(() => {
        if (currentUser) navigate("/")
    },[currentUser])
    return <>
        <div className="grid grid-cols-[240px_auto] items-center">
            <AuthSideBar />
            <Outlet />
        </div>
    </>
}

export default Authentication