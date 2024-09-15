"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

export default function Hero() {
    const controls = useAnimation()
    const shapeControls = useAnimation()
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible")
                    shapeControls.start("visible")
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [controls, shapeControls])

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    const shapeVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } }
    }

    return (
        <>
            <section ref={ref} className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black opacity-50"></div>
                
                {/* Left shape */}
                <motion.div
                    initial="hidden"
                    animate={shapeControls}
                    variants={shapeVariants}
                    className="absolute left-0 top-0 h-full w-1/2 overflow-hidden"
                >
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,0 L50,100 L0,100 Z" fill="rgba(129, 140, 248, 0.2)" />
                    </svg>
                </motion.div>
                
                {/* Right shape */}
                <motion.div
                    initial="hidden"
                    animate={shapeControls}
                    variants={{...shapeVariants, hidden: { x: "100%", opacity: 0 }}}
                    className="absolute right-0 top-0 h-full w-1/2 overflow-hidden"
                >
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,0 L100,100 L50,100 Z" fill="rgba(167, 139, 250, 0.2)" />
                    </svg>
                </motion.div>
                
                <div className="container mx-auto px-6 z-10">
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={variants}
                        className="text-center"
                    >
                        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-300">
                            Empower Your Vision
                        </h1>
                        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
                            Transform ideas into global impact. Practical solutions for creators and founders.
                        </p>
                        <Link
                            href="/subscribe"
                            className="group relative inline-flex items-center overflow-hidden rounded-full bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                        >
                            <span className="absolute -end-full transition-all group-hover:end-4">
                                <svg
                                    className="h-5 w-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                            <span className="text-sm font-medium transition-all group-hover:me-4">
                                Start Your Journey To Greatness
                            </span>
                        </Link>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
            </section>
        </>
    );
}
