"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { Overlay } from "./Overlay";

export const ScrollyCanvas: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // total number of images in sequence
    const frameCount = 75;

    // preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                // Format: frame_00_delay-0.067s.png
                const frameIndex = i.toString().padStart(2, "0");
                img.src = `/sequence/frame_${frameIndex}_delay-0.067s.png`;
                await new Promise((resolve) => {
                    img.onload = resolve;
                    // handle error just by resolving to continue
                    img.onerror = resolve; 
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setIsLoaded(true);
        };
        
        loadImages();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // we map scroll progress 0-1 to frame index 0-74
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        if (!isLoaded || images.length === 0) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        
        if (!canvas || !ctx) return;
        
        // Setup initial canvas dimensions
        const updateDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(0);
        };

        const renderFrame = (index: number) => {
             // clamp index
            const safeIndex = Math.min(Math.max(Math.floor(index), 0), frameCount - 1);
            const img = images[safeIndex];
            
            if (img && img.complete) {
                // object-fit: cover logic for canvas
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;
                
                let drawWidth = canvas.width;
                let drawHeight = canvas.height;
                let offsetX = 0;
                let offsetY = 0;

                if (canvasRatio > imgRatio) {
                     drawHeight = canvas.width / imgRatio;
                     offsetY = (canvas.height - drawHeight) / 2;
                } else {
                     drawWidth = canvas.height * imgRatio;
                     offsetX = (canvas.width - drawWidth) / 2;
                }
                
                // fill background
                ctx.fillStyle = "#121212";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // draw image centered and scaled
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        window.addEventListener("resize", updateDimensions);
        updateDimensions(); // Initialize
        
        // subscribe to framer motion changes
        const unsubscribe = frameIndex.on("change", (latest) => {
            renderFrame(latest);
        });

        return () => {
            window.removeEventListener("resize", updateDimensions);
            unsubscribe();
        };

    }, [isLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="h-[500vh] relative w-full bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
                        <span className="text-white/50 text-sm tracking-widest uppercase">Loading Assets...</span>
                    </div>
                )}
                <canvas 
                    ref={canvasRef} 
                    className="w-full h-full block"
                />
                <Overlay progress={scrollYProgress} />
            </div>
        </div>
    );
};
