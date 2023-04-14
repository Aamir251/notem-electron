import { useEffect, useRef, useState } from "react";
import SubmitBtn from "../Components/SubmitBtn";
import { createUserDocInDb, createUserObject, handleGoogleSignin, handleSignInError, validateInputs } from "../utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import GoogleButton from "../Components/GoogleButton";


const LoginForm = () => {
    const [ error, setError ] = useState(null)
    let emailRef = useRef(''),
        passRef = useRef('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = createUserObject('LOGIN')(emailRef.current.value, passRef.current.value)

        try {
            validateInputs('LOGIN')(email, password)
        } catch (error) {
            console.error("Error occured ", error.message)
            setError(error.message)
            return
        }

        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password)
            const { email, displayName } = userCred.user
            await createUserDocInDb(email, displayName)
        } catch (error) {
            console.log("Error ", error.code);
            setError(handleSignInError(error.code))
        }

    }


    useEffect(() => {
        let intervalId;
        if(error) {
            intervalId = setTimeout(() => setError(null), 4000)
        }

        return () => clearTimeout(intervalId)
    },[error])

    const borderClass = 'border border-0 border-transparent border-l-2 focus:border-victoria'
    const inputClass = 'block transition w-96 duration-300 bg-titan-white py-1.5 rounded-sm  px-3 text-kimberly outline-none '+borderClass
    
    return <>
        <div className="flex flex-col items-center mt-3">
        { error && <p className="bg-gallery text-kimberly pt-1.5 pb-2 px-1.5 rounded-sm border border-kimberly heading-five">{error}</p> }
        <GoogleButton onClick={handleGoogleSignin} >Sign in with Google</GoogleButton>
            <form onSubmit={handleSubmit} >
                <div className="space-y-4 mt-3 flex flex-col items-center">
                    <input  
                        placeholder="email"
                        ref={emailRef}
                        type='email'
                        required
                        className={inputClass}
                    />
                    <input  
                        placeholder="password"
                        ref={passRef}
                        type='password'
                        required
                        className={inputClass}
                    />
                    <SubmitBtn />
                </div>
            </form>
        </div>
    </>
}

export default LoginForm