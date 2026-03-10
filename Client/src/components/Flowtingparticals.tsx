import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Flowtingparticals = () => {
    const [particles, setParticles] = useState<{ initialX: number, initialY: number, width: number, height: number, animX: number, animY: number, duration: number }[]>([])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles([...Array(20)].map(() => ({
            initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            initialY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            animX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            animY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            duration: Math.random() * 15 + 10,
        })))
    }, [])

    return (
        <div className="absolute inset-0 overflow-hidden opacity-25">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-purple-400"
                    initial={{
                        x: p.initialX,
                        y: p.initialY,
                        width: p.width,
                        height: p.height,
                        opacity: 0
                    }}
                    animate={{
                        x: p.animX,
                        y: p.animY,
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: p.duration,
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
