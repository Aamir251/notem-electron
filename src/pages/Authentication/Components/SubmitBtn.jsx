const SubmitBtn = () => {
    const hoverClass = 'transition duration-300 hover:bg-transparent hover:text-victoria'
    return <button 
        type="submit"
        className={`bg-victoria border border-victoria text-white px-4 py-2 rounded-sm ${hoverClass}`}
    >
    Let&apos;s Go
</button>
}

export default SubmitBtn