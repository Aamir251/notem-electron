import { useAuth } from "../../Context/AuthContext";
import { useDateAndTime } from "./hooks/useDateAndTIme";
import { useGreet } from "./hooks/useGreeting";

const Heading = () => {
    const { greeting } = useGreet()
    const { currentUser } = useAuth()
    const { date, day, time } = useDateAndTime()
    
    return (
        <section className="relative">
            <figure className=" absolute w-full h-60 left-0 top-0 -z-10">
                <img
                    className="w-full h-60 object-cover" 
                    src="/images/dashboard-bg.png"
                />
            </figure>
            <div className="pt-12 container">
                <h2 className="heading-two semibold text-white">
                    {greeting}, {currentUser.displayName}
                </h2>
                <p className="text-alto mt-2">
                    {time} / <span className="uppercase">{day}, {date}</span>
                </p>
            </div>
        </section>
    )
}

export default Heading;