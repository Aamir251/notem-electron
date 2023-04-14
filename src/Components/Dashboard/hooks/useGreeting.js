import { useEffect, useState } from "react"

export const useGreet = () => {
    
    const [ greeting, setGreeting ] = useState()

    useEffect(() => {
        const currentHour = new Date().getHours()
        if(currentHour > 12) {
            setGreeting("Good Evening")
        } else {
            setGreeting("Good Morning")
        }

        
    },[])

    return { greeting }

}