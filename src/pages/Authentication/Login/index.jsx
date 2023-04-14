import { Link, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import { motion } from "framer-motion";

const Login = () => {
    const location = useLocation()
    return <>
        <motion.section
            key={location.pathname}
            initial={{ opacity : 0}} 
            animate={{ opacity : 1, transition : { duration : 1 }}}
            exit={{ opacity : 0 }}
        className="w-full">

        <h1 className="heading-one bold text-victoria text-center">Login To Your Account</h1>
        {/* Google sign in button goes here */}

        <LoginForm />
    </motion.section>
    </>
}

export default Login;
