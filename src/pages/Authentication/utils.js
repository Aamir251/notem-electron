import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const isValidEmail = (email) => {
    if(email.includes('.') && email.includes('@')) {
        return true
    }
    return false
}

export const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider()
    try {
        const resp = await signInWithPopup(auth, provider)
        const user = resp.user;
        const { email, displayName } = user
        await createUserDocInDb(email, displayName)

    } catch (error) {
        const errorCode = error.code;
        console.error("ERROR ", errorCode)
    }

}

export const validateInputs = (type) => {
    // sub utility function
    const  checkEmailAndPass = (email, pass) => {
        if (!email) throw new Error('Please Enter email')

        if(isValidEmail(email)) {
            if (!pass) throw new Error('Please Enter password')
            return true 
        } else {
            throw new Error('Please Enter valid Email')
        }
    }
    // Using closure to return two diff functns based on type
    if(type === 'SIGNUP') {
        return (name, email, pass) => {

            if (!name) throw new Error('Please Enter name')
            checkEmailAndPass(email, pass)
        }
    } else {
        return (email, pass) => {
            checkEmailAndPass(email, pass)
        }
    }
}


export const createUserObject = ( type ) => {
    if(type === 'SIGNUP') {
        return function (name, email, password) {
            return {
                name,
                email,
                password
            }
            // return userObj
        }
    } else {
        return function (email, password) {
            return {
                email,
                password
            }
            // return userObj
        }
    }
}

export const handleSignInError = (errorCode) => {
    const errorMessage = {
        'auth/wrong-password' : "Password is Incorrect! ",
        'auth/email-already-in-use' : 'Oops, Account already exists with this email!',
        'auth/user-not-found' : "Oops, Email is Incorrect"
    }
    return errorMessage[errorCode] ?? 'Incorrect Credentials'
}

export const createUserDocInDb = async (email, name) => {
    try {
        await setDoc(doc(db, "usersDocs", email), {
            email,
            name,
            dashboardNotes : ""
        })

        return {
            success : true
        }

    } catch (error) {
        throw new Error(error.message)
    }
}