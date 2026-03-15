"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface OverlayProps {
    progress: MotionValue<number>;
}

export const Overlay: React.FC<OverlayProps> = ({ progress }) => {
    // We bind the text animations to the document scroll progress
    // so it moves synchronously alongside the canvas container

    // Instead of tying to a ref, we stick to the window scroll to sync roughly with 500vh
    // Assuming the main scroller is the entire page.

    // Section 1: Fades out incredibly fast as soon as user starts scrolling down
    const opacity1 = useTransform(progress, [0, 0.05], [1, 0]);
    const y1 = useTransform(progress, [0, 0.05], [0, -100]);

    // Section 2: Fades in middle, fades out
    const opacity2 = useTransform(progress, [0.2, 0.35, 0.5, 0.65], [0, 1, 1, 0]);
    const y2 = useTransform(progress, [0.2, 0.35], [100, -100]);

    // Section 3: Fades in towards end of the canvas scroll block
    const opacity3 = useTransform(progress, [0.7, 0.8, 0.95, 1], [0, 1, 1, 0]);
    const y3 = useTransform(progress, [0.7, 0.8], [100, 0]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Section 1 */}
            <motion.div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center p-8 h-auto"
                style={{ opacity: opacity1, y: y1 }}
            >
                {/* 
                  Color Theory: Monochromatic / Neutral Platinum.
                  Extremely sophisticated, minimalist, and "watchable". 
                */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[calc(-0.05em)] mb-10 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-[#d1d1d1] to-[#a1a1a1]">
                    Sasi Kumar
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 relative z-10 max-w-4xl">
                    {["Web Developer", "UI/UX Designer", "ML Engineer"].map((role, idx) => (
                        <motion.div 
                            key={idx}
                            animate={{ 
                                boxShadow: ["0 0 10px rgba(255,255,255,0.05)", "0 0 20px rgba(255,255,255,0.15)", "0 0 10px rgba(255,255,255,0.05)"] 
                            }}
                            transition={{ 
                                duration: 3, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                            className="px-6 py-2 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-xl text-white font-light tracking-[0.15em] text-xs md:text-sm uppercase shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        >
                            {role}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-start p-8 md:p-32 text-white"
                style={{ opacity: opacity2, y: y2 }}
            >
                <div>
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 max-w-xl leading-[1.1]">
                        I Create digital experiences.
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl font-light max-w-md">
                        Transforming complex problems into elegant and performant web interfaces.
                    </p>
                </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-end p-8 md:p-32 text-white"
                style={{ opacity: opacity3, y: y3 }}
            >
                <div className="text-right">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 max-w-xl leading-[1.1]">
                        Machine Learning<br />Engineer
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl font-light max-w-md ml-auto">
                        Bridging data and intelligent decision-making.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
