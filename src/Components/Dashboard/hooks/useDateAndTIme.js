import { useEffect, useState } from "react"

export const useDateAndTime = () => {
    const [ dateAndTime, setDateAndTime ] = useState({})
    const months= ["January","February","March","April","May","June","July", "August","September","October","November","December"];

    useEffect(() => {
        setInterval(() => {
            const dateObj = new Date()
            const hours = dateObj.getHours()
            const amPm = hours > 12 ? "P.M" : "A.M";
            const formattedHour = hours > 12 ? hours % 12 : hours
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
            const time = `${formattedHour}:${dateObj.getMinutes()} ${amPm}`;
            const day = days[dateObj.getDay()]
            const month = months[dateObj.getMonth()];
            const date = `${dateObj.getDate()} ${month} ${dateObj.getFullYear()}`
            setDateAndTime({
                time,
                day,
                date,
            })
        }, 60)

    },[])

    return {
        ...dateAndTime
    }
}

