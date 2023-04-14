import { Link, useLocation } from "react-router-dom";
import SecondaryButton from "../../../Components/Buttons/SecondaryButton";

const AuthSideBar = () => {
    
    return <>
    <aside  className="bg-victoria border border-bg-red-100 h-screen flex flex-col px-2">
        <figure className="w-20 h-20 mx-auto object-contain">
            <img 
                className="object-contain pt-10"
                src="/images/notem-logo.svg" 
                alt="notem logo" 
                />
        </figure>
        <div className=" h-full flex flex-col items-center justify-center ">
            <Content />
        </div>
    </aside>
</>
}

export default AuthSideBar;

const Content = () => {
    const location = useLocation()
    const isLoginPage = location.pathname === '/auth/login'

    if(isLoginPage) {
        return <div className="text-white flex flex-col items-center justify-center text-center space-y-3">
            <h2 className="heading-one semibold">New Here?</h2>
            <p className="text-gallery">Sign up and start noting all your important stuffs into Notem</p>
            
            <SecondaryButton url={"/auth/signup"}>Sign Up</SecondaryButton>
        </div>
    }

    return (
        <div className="text-white flex flex-col items-center justify-center text-center space-y-3">
            <h2 className="heading-one semibold">Have an Account?</h2>
            <p className="text-gallery">LogIn and start noting all your important stuffs into Notem</p>
            
            <SecondaryButton url={"/auth/login"}>Login</SecondaryButton>
        </div>
    )
}