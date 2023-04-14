const Loader = ({ width, height }) => {
    return (
        <span
            aria-label={`${width}px`}
            style={{ 
                width : `${width}px`, 
                height : `${height}px` 
            }} 
        class="loader block"></span>
    )
}

export default Loader;