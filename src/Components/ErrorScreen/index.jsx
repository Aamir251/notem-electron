import { useRouteError } from "react-router-dom"

const ErrorScreen = () => {
    
    const error = useRouteError()
    console.error("Error Occured", error.message)
    return <>
        <h2>Oops! Something went wrong</h2>
        <div>
            <p>{error.statusText}</p>
            <p className="mt-2">{error.message}</p>
        </div>
    </>
}

export default ErrorScreen;