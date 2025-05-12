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
    rotate?: boolean; // Whether the particles rotate
    drift?: boolean; // Whether particles drift left/right
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
function getDefaultsByType(type: string) {
    switch (type) {
        case 'rain': return { count: 50, rotate: false, drift: true, tiltWithDrift: true, speedRange: [4, 5], sizeRange: [10, 20], opacity: 1, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.3 };
        case 'heart': return { count: 20, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.1, 1], sizeRange: [50, 100], opacity: 0.52, rotateSwingRange: 15, rotateSpeed: 0.015, driftAmount: 0.2 };
        case 'maple': return { count: 50, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [24, 48], opacity: 0.8, rotateSwingRange: 45, rotateSpeed: 0.03, driftAmount: 0.01 };
        case 'bubble': return { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.3, 0.8], sizeRange: [10, 20], opacity: 0.8, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 };
        case 'carnation': return { count: 30, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 };
        case 'snow': return { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [8, 16], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 };
        case 'snowflake': return { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [15, 30], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.4 };
        default: return { count: 50, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 };
    }
}

const FallingParticles: React.FC<FallingParticlesProps> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | null>(null);

    // Merge incoming props with default values based on particle type
    const mergedProps = useMemo(() => {
        const type = props.type ?? 'carnation';
        const defaults = getDefaultsByType(type);
        return {
            type,
            count: props.count ?? defaults.count,
            speedRange: props.speedRange ?? defaults.speedRange,
            sizeRange: props.sizeRange ?? defaults.sizeRange,
            opacity: props.opacity ?? defaults.opacity,
            rotate: props.rotate ?? defaults.rotate,
            drift: props.drift ?? defaults.drift,
            angleInitial: props.angleInitial ?? 0,
            rotateSwingRange: props.rotateSwingRange ?? defaults.rotateSwingRange,
            rotateSpeed: props.rotateSpeed ?? defaults.rotateSpeed,
            driftAmount: props.driftAmount ?? defaults.driftAmount,
            tiltWithDrift: props.tiltWithDrift ?? defaults.tiltWithDrift,
            textOverlay: props.textOverlay,
            background: props.background ?? 'transparent',
        };
    }, [props]);

    // Keep the latest textOverlay value in a ref for consistent rendering
    const textOverlayRef = useRef(mergedProps.textOverlay);
    useEffect(() => {
        textOverlayRef.current = mergedProps.textOverlay;
    }, [mergedProps.textOverlay]);

    // Particle animation and rendering logic
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const loadImage = (src: string | { src: string }) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.src = typeof src === 'string' ? src : src.src;
                img.onload = () => resolve(img);
                img.onerror = reject;
            });

        let resizeObserver: ResizeObserver;

        const init = async () => {
            try {
                const resolvedTypes: (keyof typeof particleImageMap)[] =
                    mergedProps.type === 'all'
                        ? Object.keys(particleImageMap) as (keyof typeof particleImageMap)[]
                        : [mergedProps.type];

                const imageSources = resolvedTypes.map(t => particleImageMap[t]);
                const imgs = await Promise.all(imageSources.map(loadImage));

                const resizeCanvas = () => {
                    canvas.width = container.offsetWidth;
                    canvas.height = container.offsetHeight;
                };
                resizeCanvas();
                resizeObserver = new ResizeObserver(resizeCanvas);
                resizeObserver.observe(container);

                // Initialize particle data
                particlesRef.current = [];
                for (let i = 0; i < mergedProps.count; i++) {
                    const img = imgs[Math.floor(Math.random() * imgs.length)];
                    const speed = randomBetween(mergedProps.speedRange[0], mergedProps.speedRange[1]);
                    const angleRange = degToRad(mapValue(speed, mergedProps.speedRange[0], mergedProps.speedRange[1], mergedProps.rotateSwingRange, 5));
                    const angleSpeed = mapValue(speed, mergedProps.speedRange[0], mergedProps.speedRange[1], mergedProps.rotateSpeed, 0.005);

                    particlesRef.current.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        speed,
                        size: randomBetween(mergedProps.sizeRange[0], mergedProps.sizeRange[1]),
                        img,
                        driftX: mergedProps.drift ? randomBetween(-mergedProps.driftAmount, mergedProps.driftAmount) : 0,
                        angle: degToRad(mergedProps.angleInitial),
                        baseAngle: degToRad(mergedProps.angleInitial),
                        angleRange: mergedProps.rotate ? angleRange : 0,
                        angleSpeed: mergedProps.rotate ? angleSpeed : 0,
                        angleTime: Math.random() * Math.PI * 2,
                    });
                }

                const animate = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    for (const p of particlesRef.current) {
                        p.y += p.speed;
                        if (mergedProps.drift) p.x += p.driftX;

                        if (mergedProps.rotate) {
                            p.angleTime += p.angleSpeed;
                            p.angle = p.baseAngle + Math.sin(p.angleTime) * p.angleRange;
                        }

                        if (p.y > canvas.height || p.x < -p.size || p.x > canvas.width + p.size) {
                            p.y = -Math.random() * 100 - 50;
                            p.x = Math.random() * canvas.width;
                            p.angleTime = Math.random() * Math.PI * 2;
                        }

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

                    // Draw overlay text
                    const overlayText = textOverlayRef.current;
                    if (overlayText) {
                        ctx.save();
                        ctx.font = '24px sans-serif';
                        ctx.fillStyle = 'rgba(0,0,0,0.7)';
                        ctx.textAlign = 'center';
                        ctx.fillText(overlayText, canvas.width / 2, 50);
                        ctx.restore();
                    }

                    animationRef.current = requestAnimationFrame(animate);
                };

                if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
                animationRef.current = requestAnimationFrame(animate);
            } catch (err) {
                console.error('Failed to load images', err);
            }
        };

        init();

        return () => {
            if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
            if (resizeObserver) resizeObserver.disconnect();
            particlesRef.current = [];
        };
    }, [mergedProps]);

    return (
        <div className={styles.container} ref={containerRef}>
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none', // Let clicks pass through the canvas
                    background: mergedProps.background,
                }}
            />
        </div>
    );
};

// Random number helper
function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
}

// Convert degrees to radians
function degToRad(deg: number) {
    return (deg * Math.PI) / 180;
}

// Map value from one range to another
function mapValue(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    const ratio = (value - inMin) / (inMax - inMin);
    return outMin + ratio * (outMax - outMin);
}

export default FallingParticles;
