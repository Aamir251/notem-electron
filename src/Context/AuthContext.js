import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null)

    return <AuthContext.Provider value={{ currentUser, setCurrentUser }} >
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => useContext(AuthContext)