import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./layout/SideBar";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useAuth } from "./Context/AuthContext";

function App() {
  const navigate = useNavigate()
  const {
    currentUser,
    setCurrentUser
  } = useAuth()
    
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const { email, displayName } = user
        setCurrentUser({
          email,
          displayName
        })
      } else {
        console.log("No user exists");
        setCurrentUser(null)
      }
    })
  }, [])
  
  useEffect(() => {
    if(!currentUser?.email) {
      navigate("/auth/login")
    }
  },[currentUser])

  return (
    <div className="App grid grid-cols-[260px_auto]">
        <SideBar />
        <Outlet />
    </div>
  );
}

export default App;
