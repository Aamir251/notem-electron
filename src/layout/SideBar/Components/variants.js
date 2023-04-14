export const sectionsVariants = {
    initial : {
        y : "10px",
        opacity : 0
    },
    animate: {
        y: 0,
        opacity : 1,
        transition: 
            { 
                staggerChildren: 0.1, 
                ease: "easeInOut", 
            },
    },
}