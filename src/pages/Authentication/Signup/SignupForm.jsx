import { useEffect, useRef, useState } from "react";
import { createUserDocInDb, createUserObject, handleGoogleSignin, handleSignInError, validateInputs } from "../utils";
import SubmitBtn from "../Components/SubmitBtn";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import GoogleButton from "../Components/GoogleButton";
const SignupForm = () => {
    const [ error, setError ] = useState(null)
    let emailRef = useRef(''),
        passRef = useRef(''),
        nameRef = useRef('');
    

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const { name, email, password } = createUserObject("SIGNUP")(nameRef.current.value,
            emailRef.current.value,
            passRef.current.value );

        try {
            validateInputs('SIGNUP')(name, email, password)
        } catch (error) {
           console.error("ERRIR ", error.message)
           setError(error.message)
           return
        }

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCred.user, {
                displayName : name
            })
            const { email, displayName } = userCred.user
            await createUserDocInDb(email, displayName)
            
        } catch (error) {
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

    return <div className="mt-3">
        { error && <p className="bg-gallery text-kimberly pt-1.5 pb-2 px-1.5 rounded-sm border border-kimberly heading-five">{error}</p> }
            <GoogleButton onClick={handleGoogleSignin} >Sign In With Google</GoogleButton>
            <form onSubmit={handleSubmit} >
                <div className="space-y-4 mt-3 flex flex-col items-center" >
                    <input  
                        placeholder="name"
                        ref={nameRef}
                        className={inputClass}
                        required
                    />
                    <input  
                        placeholder="email"
                        ref={emailRef}
                        className={inputClass}
                        required
                    />
                    <input  
                        placeholder="password"
                        ref={passRef}
                        className={inputClass}
                        required
                    />
                    <SubmitBtn />
                </div>
            </form>
    </div>
}

export default SignupForm;