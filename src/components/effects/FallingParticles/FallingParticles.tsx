import React, { useRef, useEffect, useMemo } from 'react';

// Import particle image assets
import heart from './assets/heart.png';
import maple from './assets/maple.png';
import snowflake from './assets/snowflake.png';
import bubble from './assets/bubble.png';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import carnation from './assets/carnation.png';

import styles from './FallingParticles.module.css';

// Props interface for the FallingParticles component
interface FallingParticlesProps {
    count?: number; // Number of particles
    speedRange?: [number, number]; // Particle falling speed range
    sizeRange?: [number, number]; // Particle size range
    type?: 'heart' | 'maple' | 'rain' | 'bubble' | 'snow' | 'snowflake' | 'carnation' | 'all';
    opacity?: number; // Particle transparency (0 to 1)
    angleInitial?: number; // Starting rotation angle
    rotateSwingRange?: number; // Maximum angle of swing rotation
    rotateSpeed?: number; // Speed of the swing rotation
    driftAmount?: number; // Max drift per frame
    tiltWithDrift?: boolean; // Whether particles tilt with drift direction
    textOverlay?: string; // Optional text overlay on the canvas
    background?: string; // Canvas background style
}

// Map each type to an image asset
const particleImageMap = {
    heart,
    maple,
    snowflake,
    snow,
    bubble,
    rain,
    carnation,
};

// Particle object structure
interface Particle {
    x: number;
    y: number;
    speed: number;
    size: number;
    img: HTMLImageElement;
    driftX: number;
    angle: number;
    baseAngle: number;
    angleRange: number;
    angleSpeed: number;
    angleTime: number;
    textOverlay?: string;
}

// Default settings per particle type
const getDefaultsByType = (type: string) => {
    switch (type) {
        case 'rain': return { count: 50, tiltWithDrift: true, speedRange: [4, 5], sizeRange: [10, 20], opacity: 1, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.3 };
        case 'heart': return { count: 20, tiltWithDrift: false, speedRange: [0.1, 1], sizeRange: [50, 100], opacity: 0.52, rotateSwingRange: 15, rotateSpeed: 0.015, driftAmount: 0.2 };
        case 'maple': return { count: 50, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [24, 48], opacity: 0.8, rotateSwingRange: 45, rotateSpeed: 0.03, driftAmount: 0.01 };
        case 'bubble': return { count: 50, tiltWithDrift: false, speedRange: [0.3, 0.8], sizeRange: [10, 20], opacity: 0.8, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 };
        case 'carnation': return { count: 30, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 };
        case 'snow': return { count: 50, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [8, 16], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 };
        case 'snowflake': return { count: 50, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [15, 30], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.4 };
        default: return { count: 50, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 };
    }
}

// Random number helper
const randomBetween = (min: number, max: number) => {
    return min + Math.random() * (max - min);
}

// Convert degrees to radians
const degToRad = (deg: number) => {
    return (deg * Math.PI) / 180;
}

// Map value from one range to another
const mapValue = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    const ratio = (value - inMin) / (inMax - inMin);
    return outMin + ratio * (outMax - outMin);
}

const initCanvas = async (canvas: HTMLCanvasElement, container: HTMLDivElement, type: keyof typeof particleImageMap | 'all', imageStore: React.MutableRefObject<HTMLImageElement[]>) => {
    // Set canvas size to match container
    const resizeCanvas = () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    };
    resizeCanvas();

    // Load images for the selected particle type(s)
    const resolvedTypes: (keyof typeof particleImageMap)[] =
        type === 'all'
            ? Object.keys(particleImageMap) as (keyof typeof particleImageMap)[]
            : [type];

    const imageSources = resolvedTypes.map(t => particleImageMap[t]);
    const imgs = await Promise.all(imageSources.map(src => new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = typeof src === 'string' ? src : src.src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    })));

    imageStore.current = imgs;
};

const FallingParticles: React.FC<FallingParticlesProps> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const particlesRef = useRef<Particle[]>([]); // Store live particles
    const animationRef = useRef<number | null>(null); // For canceling animation frame
    const imagesRef = useRef<HTMLImageElement[]>([]); // Loaded images

    const prevTypeRef = useRef<string>(''); // Track last type to know when to re-init
    const isReadyRef = useRef<boolean>(false); // Prevent drawing before resources are ready

    // Merge incoming props with type-specific defaults
    const mergedProps = useMemo(() => {
        const type = props.type ?? 'carnation';
        const defaults = getDefaultsByType(type);
        return {
            type,
            count: props.count ?? defaults.count,
            speedRange: props.speedRange ?? defaults.speedRange,
            sizeRange: props.sizeRange ?? defaults.sizeRange,
            opacity: props.opacity ?? defaults.opacity,
            rotate: props.rotateSpeed ?? defaults.rotateSpeed > 0,
            drift: props.driftAmount ?? defaults.driftAmount > 0,
            angleInitial: props.angleInitial ?? 0,
            rotateSwingRange: props.rotateSwingRange ?? defaults.rotateSwingRange,
            rotateSpeed: props.rotateSpeed ?? defaults.rotateSpeed,
            driftAmount: props.driftAmount ?? defaults.driftAmount,
            tiltWithDrift: props.tiltWithDrift ?? defaults.tiltWithDrift,
            textOverlay: props.textOverlay,
            background: props.background ?? 'transparent',
        };
    }, [props]);


    // Keep updated text overlay
    const textOverlayRef = useRef(mergedProps.textOverlay);
    useEffect(() => {
        textOverlayRef.current = mergedProps.textOverlay;
    }, [props.textOverlay, mergedProps.textOverlay]);


    // Re-init canvas and reset particles if type changed
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        if (prevTypeRef.current !== mergedProps.type) {
            isReadyRef.current = false;
            initCanvas(canvas, container, mergedProps.type, imagesRef).then(() => {
                particlesRef.current = []; // Clear all particles on type switch
                prevTypeRef.current = mergedProps.type;
                isReadyRef.current = true;
            });
        }
    }, [mergedProps.type]);



    // Animation loop: add new particles over time and update existing ones
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        resizeCanvas();

        let frameCount = 0;
        const spawnInterval = 5; // Every N frames, add a new particle (adjust for appearance speed)

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const p of particlesRef.current) {
                // Movement logic
                p.y += p.speed;
                if (mergedProps.drift) p.x += p.driftX;

                // Rotation logic
                if (mergedProps.rotate) {
                    p.angleTime += p.angleSpeed;
                    p.angle = p.baseAngle + Math.sin(p.angleTime) * p.angleRange;
                }

                // Draw particle
                ctx.save();
                ctx.globalAlpha = mergedProps.opacity;
                ctx.filter = 'blur(1px)';

                if (mergedProps.rotate || mergedProps.tiltWithDrift) {
                    ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
                    let totalAngle = 0;
                    if (mergedProps.rotate) totalAngle += p.angle;
                    if (mergedProps.tiltWithDrift) totalAngle += Math.atan2(-p.driftX, p.speed);
                    ctx.rotate(totalAngle);
                    ctx.translate(-p.size / 2, -p.size / 2);
                    ctx.drawImage(p.img, 0, 0, p.size, p.size);
                } else {
                    ctx.drawImage(p.img, p.x, p.y, p.size, p.size);
                }

                ctx.restore();
            }

            // Add new particle
            frameCount++;
            const currentCount = particlesRef.current.length;
            const targetCount = mergedProps.count;
            const canAdd = isReadyRef.current && imagesRef.current.length > 0;
            if (canAdd && currentCount < targetCount && frameCount % spawnInterval === 0) {
                const img = imagesRef.current[Math.floor(Math.random() * imagesRef.current.length)];
                const speed = randomBetween(mergedProps.speedRange[0], mergedProps.speedRange[1]);
                const size = randomBetween(mergedProps.sizeRange[0], mergedProps.sizeRange[1]);
                const angleRange = degToRad(mapValue(speed, mergedProps.speedRange[0], mergedProps.speedRange[1], mergedProps.rotateSwingRange, 5));
                const angleSpeed = mapValue(speed, mergedProps.speedRange[0], mergedProps.speedRange[1], mergedProps.rotateSpeed, 0.005);

                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: -size - Math.random() * 100, // Random vertical offset above top edge
                    speed,
                    size,
                    img,
                    driftX: mergedProps.drift ? randomBetween(-mergedProps.driftAmount, mergedProps.driftAmount) : 0,
                    angle: degToRad(mergedProps.angleInitial),
                    baseAngle: degToRad(mergedProps.angleInitial),
                    angleRange: mergedProps.rotate ? angleRange : 0,
                    angleSpeed: mergedProps.rotate ? angleSpeed : 0,
                    angleTime: Math.random() * Math.PI * 2,
                });
            }

            // Remove off-screen particles
            particlesRef.current = particlesRef.current.filter(p =>
                !(p.y > canvas.height || p.x < -p.size || p.x > canvas.width + p.size)
            );

            // Optional text overlay
            const overlayText = textOverlayRef.current;
            if (overlayText) {
                ctx.save();
                ctx.font = '24px sans-serif';
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.textAlign = 'center';
                ctx.fillText(overlayText, canvas.width / 2, 50);
                ctx.restore();
            }

            // Continue animation
            animationRef.current = requestAnimationFrame(animate);
        };

        if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
            particlesRef.current = [];
        };
    }, [
        mergedProps.count,
        mergedProps.speedRange,
        mergedProps.sizeRange,
        mergedProps.opacity,
        mergedProps.rotate,
        mergedProps.drift,
        mergedProps.angleInitial,
        mergedProps.rotateSwingRange,
        mergedProps.rotateSpeed,
        mergedProps.driftAmount,
        mergedProps.tiltWithDrift,
        mergedProps.background
    ]);

    return (
        <div className={styles.container} ref={containerRef}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    background: mergedProps.background,
                }}
            />
        </div>
    );
};

export default FallingParticles;