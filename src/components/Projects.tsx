"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        title: "E-Commerce Platform",
        description: "A high-performance headless commerce storefront built for the modern web.",
        tags: ["Next.js", "Shopify", "Framer Motion"],
        image: "/projects/ecommerce.png",
        color: "from-pink-500/20 to-rose-500/20",
        accent: "bg-pink-500",
        size: "large" // Using a "size" property for the bento layout logic
    },
    {
        title: "Fintech Dashboard",
        description: "Real-time analytics and trading interface with complex data visualization.",
        tags: ["React", "D3.js", "TailwindCSS"],
        image: "/projects/fintech.png",
        color: "from-purple-500/20 to-indigo-500/20",
        accent: "bg-purple-500",
        size: "medium"
    },
    {
        title: "Creative Agency",
        description: "An interactive experience with high-end WebGL features.",
        tags: ["Three.js", "GSAP", "TypeScript"],
        image: "/projects/agency.png",
        color: "from-blue-500/20 to-cyan-500/20",
        accent: "bg-blue-500",
        size: "medium"
    },
    {
        title: "SaaS Application UI",
        description: "A comprehensive design system and component library built for enterprise scale.",
        tags: ["Storybook", "Radix UI", "TailwindCSS"],
        image: "/projects/saas.png",
        color: "from-emerald-400/20 to-teal-500/20",
        accent: "bg-emerald-400",
        size: "large"
    }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for magnetic tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Parallax image movement
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["2%", "-2%"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["2%", "-2%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1200,
            }}
            className={`group relative rounded-[2.5rem] bg-white/[0.02] border border-white/10 overflow-hidden transition-colors duration-500 hover:bg-white/[0.04] p-1 col-span-1`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full p-6 md:p-10 rounded-[2.2rem] overflow-hidden bg-[#161618]"
            >
                {/* Glow effect */}
                <div className={`absolute -inset-20 bg-gradient-to-br ${project.color} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                {/* Shimmer Sweep */}
                <motion.div 
                    animate={isHovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none z-20"
                />

                <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-white/40 text-xs font-medium tracking-[0.2em] uppercase mb-2 block">Project {index + 1}</span>
                            <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">
                                {project.title}
                            </h3>
                        </div>
                        <div className={`w-12 h-12 rounded-full ${project.accent} flex items-center justify-center bg-opacity-20 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative w-full h-[200px] md:h-[280px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
                        <motion.div 
                            style={{ x: imageX, y: imageY, scale: 1.1 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </motion.div>
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none z-10"></div>
                    </div>

                    <p className="text-white/60 mb-8 font-light text-base leading-relaxed line-clamp-2">
                        {project.description}
                    </p>
                    
                    <div className="mt-auto flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                            <span 
                                key={tagIndex} 
                                className="px-5 py-2 rounded-full border border-white/5 text-[10px] font-medium tracking-[0.1em] uppercase text-white/50 bg-white/[0.02] group-hover:border-white/20 transition-all duration-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const Projects: React.FC = () => {
    return (
        <section id="projects" className="min-h-screen bg-[#121212] pt-16 pb-32 px-6 md:px-12 lg:px-24 relative z-20 w-full text-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                    className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-light mb-8 tracking-tighter leading-none">
                            Selected <span className="italic block md:inline">Works.</span>
                        </h2>
                        <p className="text-white/40 text-xl font-light leading-relaxed">
                            Crafting digital artifacts that push the boundaries of technology and aesthetics. 
                            Each project is a deep dive into problem-solving and visual storytelling.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-white/30 text-sm font-medium tracking-[0.2em] uppercase">
                        <span>Scroll</span>
                        <div className="w-12 h-[1px] bg-white/10" />
                        <span>Experience</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
