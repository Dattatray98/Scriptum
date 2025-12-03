import { motion } from 'framer-motion'

const Flowtingparticals = () => {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-25">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-purple-400"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        width: Math.random() * 8 + 2,
                        height: Math.random() * 8 + 2,
                        opacity: 0
                    }}
                    animate={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}

export default Flowtingparticals
