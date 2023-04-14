
import { motion } from "framer-motion";
import SignupForm from "./SignupForm";

const SignUp = () => {

    return <>
        <motion.section
        initial={{ opacity : 0}}
        animate={{ opacity : 1, transition : { duration : 1 }}}
        exit={{ opacity : 0 }}
        className="flex flex-col items-center">
            <h1 className="heading-one bold text-victoria text-center">Sign In To Your Account</h1>

            <SignupForm />
        </motion.section>
    </>
}

export default SignUp;