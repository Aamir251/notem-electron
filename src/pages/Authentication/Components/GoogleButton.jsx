const GoogleButton = ({ onClick, children }) => {
    return <button onClick={onClick} className="flex transition duration-300 space-x-2 items-center bg-victoria rounded-sm px-3 py-1.5 mx-auto hover:opacity-80">
        <img 
            src="/images/icons/google.svg"
            alt="sign in with google"
            className="block w-6 h-6 object-contain"
        />
        <span className="block mb-0.5 text-white heading-five semibold">
            {children}
        </span>
    </button>
}

export default GoogleButton