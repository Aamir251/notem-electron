import { Outlet, useNavigation } from "react-router-dom";
import SideBar from "./layout/SideBar";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useAuth } from "./Context/AuthContext";

function App() {
  const navigate = useNavigation()
  const {
    setCurrentUser
  } = useAuth()
    
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const { email, displayName } = user
        console.log("Current User in App is ", email);
        setCurrentUser({
          email,
          displayName
        })
      } else {
        console.log("No user exists");
        setCurrentUser(null)
        navigate("/auth/login")
      }
    })
  }, [])
  

  return (
    <div className="App grid grid-cols-[260px_auto]">
        <SideBar />
        <Outlet />
    </div>
  );
}

export default App;
