"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Mail, Github, Linkedin, Phone, MapPin, ArrowUpRight } from "lucide-react";

const MagneticLink = ({ children, href }: { children: React.ReactNode, href: string }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15 };
    const dx = useSpring(x, springConfig);
    const dy = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: dx, y: dy }}
            className="relative flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors duration-300 group"
        >
            {children}
            <motion.div 
                className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
            >
                <ArrowUpRight className="w-4 h-4 text-white" />
            </motion.div>
        </motion.a>
    );
};

export const Contact: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

    return (
        <footer 
            ref={containerRef}
            className="relative bg-[#0a0a0a] min-h-screen flex flex-col justify-between pt-40 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
        >
            {/* Architectural Background Mesh */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <motion.div 
                style={{ opacity, y }}
                className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center"
            >
                {/* Massive Impact Typography */}
                <div className="relative mb-20 md:mb-32">
                    <h2 className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent absolute inset-0 select-none">
                        LET'S TALK
                    </h2>
                    <h2 className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter text-white relative flex flex-col items-center">
                        <span>GET IN</span>
                        <span className="italic font-light opacity-80 md:ml-[10vw]">TOUCH.</span>
                    </h2>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 mb-32">
                    {/* Information Columns */}
                    <div className="space-y-8 text-center md:text-left">
                        <div>
                            <span className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Navigation</span>
                            <nav className="flex flex-col gap-4 text-xl">
                                <a href="#" className="hover:text-white/60 transition-colors w-fit mx-auto md:mx-0">Home</a>
                                <a href="#projects" className="hover:text-white/60 transition-colors w-fit mx-auto md:mx-0">Work</a>
                                <a href="#skills" className="hover:text-white/60 transition-colors w-fit mx-auto md:mx-0">About</a>
                                <a href="#contact" className="hover:text-white/60 transition-colors w-fit mx-auto md:mx-0">Contact</a>
                            </nav>
                        </div>
                    </div>

                    <div className="space-y-8 text-center">
                        <div>
                            <span className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Official Contact</span>
                            <a href="mailto:sasikumarsingireddy@gmail.com" className="text-xl md:text-2xl lg:text-3xl font-light hover:opacity-70 transition-opacity whitespace-nowrap inline-block">
                                sasikumarsingireddy@gmail.com
                            </a>
                            <div className="mt-6 flex flex-col items-center gap-2 text-white/50 font-light">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>+91 9390075359</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Visakhapatnam, AP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 flex flex-col items-center lg:items-end">
                        <div className="w-full max-w-[200px] lg:max-w-none">
                            <span className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-6 block text-center lg:text-right text-nowrap">Follow Me</span>
                            <div className="flex justify-center lg:justify-end gap-4">
                                <MagneticLink href="https://github.com/sasi-kumar-s">
                                    <Github className="w-6 h-6" />
                                </MagneticLink>
                                <MagneticLink href="https://www.linkedin.com/in/singireddy-sasi-kumar">
                                    <Linkedin className="w-6 h-6" />
                                </MagneticLink>
                                <MagneticLink href="mailto:sasikumarsingireddy@gmail.com">
                                    <Mail className="w-6 h-6" />
                                </MagneticLink>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Footer */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center py-8 border-t border-white/5 text-white/20 text-xs tracking-widest font-medium uppercase">
                <div className="mb-4 md:mb-0">
                    © {new Date().getFullYear()} SASI KUMAR — ALL RIGHTS RESERVED
                </div>
                <div className="flex gap-8">
                    <span>DESIGNED BY ME</span>
                    <span>DEVELOPED WITH NEXT.JS</span>
                </div>
            </div>
        </footer>
    );
};
