import { Link } from "react-router-dom"

const SecondaryButton = ({ url, children }) => {
    const hoverEffect = 'transition duration-300 border hover:border-selago hover:text-selago hover:bg-transparent'

    return (
            <Link to={url} className={`inline-block text-victoria bg-selago px-5 py-2 rounded-sm ${hoverEffect} cursor-pointer`}>
            {children}
        </Link>
    )
}

export default SecondaryButton