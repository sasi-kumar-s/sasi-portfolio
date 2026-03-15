"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const skillsData = [
    { category: "Design Tools", items: ["Canva", "Figma"], level: "Basic / UI Explorer", color: "from-pink-500 to-rose-500" },
    { category: "Machine Learning", items: ["Beginner AI Models", "Data Preprocessing"], level: "Learning & Exploring", color: "from-purple-500 to-indigo-500" },
    { category: "Core Programming", items: ["C", "Python"], level: "Logic Builder", color: "from-blue-500 to-cyan-500" },
    { category: "Web Development", items: ["HTML", "CSS", "JavaScript", "React.js"], level: "Front-End Architect", color: "from-emerald-400 to-teal-500" }
];

export const Skills: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    // Create a smooth parallax scroll effect tracking the section progress
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="skills" ref={sectionRef} className="bg-[#121212] pt-32 pb-16 px-4 md:px-8 relative z-20 w-full text-white overflow-hidden flex flex-col justify-center">
            
            {/* Background creative typography that moves slowly with scroll. 
                Increased opacity slightly for more "pop" */}
            <motion.div 
                className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05] flex flex-col justify-center whitespace-nowrap overflow-hidden select-none"
                style={{ y: useTransform(smoothProgress, [0, 1], [-300, 300]) }}
            >
                <div className="text-[22vw] font-black leading-none mb-[-4%] ml-[-5%] tracking-tighter">EXPERTISE</div>
                <div className="text-[22vw] font-black leading-none ml-[5%] text-transparent tracking-tighter" style={{ WebkitTextStroke: "2px white" }}>TOOLKIT</div>
            </motion.div>

            {/* Glowing orb background effect to draw the eye */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-24 md:mb-32 text-center md:text-left"
                >
                    <h2 className="text-6xl md:text-8xl font-medium tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
                        Skill Evolution.
                    </h2>
                    <p className="text-white/60 text-xl font-light max-w-2xl mx-auto md:mx-0">
                        A continuous journey bridging the gap between design theory, logical architecture, and intelligent systems.
                    </p>
                </motion.div>

                <div className="relative border-l-2 border-white/10 pl-8 md:pl-16 ml-4 md:ml-0 space-y-32">
                    {skillsData.map((group, index) => {
                        return (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                className="relative group"
                            >
                                {/* Glowing Timeline Node */}
                                <div className="absolute -left-[41px] md:-left-[73px] top-4 w-4 h-4 rounded-full bg-[#121212] border-2 border-white z-10 shadow-[0_0_20px_rgba(255,255,255,1)] group-hover:scale-150 transition-all duration-500">
                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${group.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                </div>
                                
                                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-10">
                                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
                                        {group.category}
                                    </h3>
                                    <div className="h-[1px] hidden md:block flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                                    <span className={`text-sm font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${group.color}`}>
                                        {group.level}
                                    </span>
                                </div>
                                
                                <div className="flex flex-wrap gap-4">
                                    {group.items.map((skill, skillIndex) => (
                                        <motion.div 
                                            key={skillIndex}
                                            whileHover={{ y: -5, scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            className="relative overflow-hidden px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md cursor-default group/skill"
                                        >
                                            {/* Colorful hover glow behind the glass */}
                                            <div className={`absolute inset-0 bg-gradient-to-r ${group.color} opacity-0 group-hover/skill:opacity-20 transition-opacity duration-300`}></div>
                                            <span className="relative z-10 text-xl font-light text-white/90 group-hover/skill:text-white transition-colors duration-300">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
