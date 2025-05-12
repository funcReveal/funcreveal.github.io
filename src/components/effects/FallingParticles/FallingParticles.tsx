import React, { useRef, useEffect } from 'react';

// ✅ Import particle image assets
import heart from './assets/heart.png';
import maple from './assets/maple.png';
import drop from './assets/drop.png';
import snowflake from './assets/snowflake.png';
import bubble from './assets/bubble.png';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import carnation from './assets/carnation.png';

import styles from './FallingParticles.module.css';

// ✅ Component props interface
interface FallingParticlesProps {
    count?: number;               // Total number of particles
    speedRange?: [number, number]; // Speed range for particles (min, max)
    sizeRange?: [number, number];  // Size range for particles (min, max)
    types?: (
        | 'heart'
        | 'maple'
        | 'rain'
        | 'bubble'
        | 'snow'
        | 'snowflake'
        | 'carnation'
        | 'all'
    )[];
    opacity?: number;            // Particle opacity (0 to 1)
    rotate?: boolean;            // Enable rotation (swinging effect)
    drift?: boolean;             // Enable horizontal drift
    angleInitial?: number;       // Initial rotation angle
    rotateSwingRange?: number;   // Max rotation swing angle in degrees
    rotateSpeed?: number;        // Speed of swinging rotation
    driftAmount?: number;        // Max horizontal drift per frame
    tiltWithDrift?: boolean;     // Whether tilt based on drift direction
    textOverlay?: string;        // Text shown on canvas
    background?: string;         // Canvas background (color or gradient)
}

// ✅ Map each particle type to its corresponding image
const particleImageMap = {
    heart,
    maple,
    drop,
    snowflake,
    snow,
    bubble,
    rain,
    carnation,
};

// ✅ Define what a particle looks like internally
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

// ✅ Return default configuration values based on type
function getDefaultsByType(type: string) {
    switch (type) {
        case 'rain':
            return { count: 50, rotate: false, drift: true, tiltWithDrift: true, speedRange: [4, 5], sizeRange: [10, 20], opacity: 1, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.3 };
        case 'heart':
            return { count: 20, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.1, 1], sizeRange: [50, 100], opacity: 0.52, rotateSwingRange: 15, rotateSpeed: 0.015, driftAmount: 0.2 };
        case 'maple':
            return { count: 50, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [24, 48], opacity: 0.8, rotateSwingRange: 45, rotateSpeed: 0.03, driftAmount: 0.01 };
        case 'bubble':
            return { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.3, 0.8], sizeRange: [10, 20], opacity: 0.8, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 };
        case 'carnation':
            return { count: 30, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 };
        case 'snow':
            return { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [8, 16], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 };
        case 'snowflake':
            return { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [15, 30], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.4 };
        default:
            return { rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 };
    }
}

const FallingParticles: React.FC<FallingParticlesProps> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | null>(null);

    const {
        types = ['carnation'],
        count = 50,
        angleInitial = 0,
    } = props;

    const primaryType = types.includes('all') ? 'default' : types[0];
    const defaults = getDefaultsByType(primaryType);

    // ✅ Use props or fallback to defaults
    const rotate = props.rotate ?? defaults.rotate;
    const drift = props.drift ?? defaults.drift;
    const speedRange = props.speedRange ?? defaults.speedRange;
    const sizeRange = props.sizeRange ?? defaults.sizeRange;
    const opacity = props.opacity ?? defaults.opacity;
    const rotateSwingRange = props.rotateSwingRange ?? defaults.rotateSwingRange;
    const rotateSpeed = props.rotateSpeed ?? defaults.rotateSpeed;
    const driftAmount = props.driftAmount ?? defaults.driftAmount;
    const tiltWithDrift = props.tiltWithDrift ?? defaults.tiltWithDrift;

    // ✅ Save latest overlay text with ref to access it in animation loop
    const textOverlayRef = useRef(props.textOverlay);
    useEffect(() => {
        textOverlayRef.current = props.textOverlay;
    }, [props.textOverlay]);

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
                const selectedTypes = types.includes('all') ? Object.keys(particleImageMap) : types;
                const imageSources = selectedTypes.map(type => particleImageMap[type as keyof typeof particleImageMap]);
                const imgs = await Promise.all(imageSources.map(loadImage));

                const resizeCanvas = () => {
                    canvas.width = container.offsetWidth;
                    canvas.height = container.offsetHeight;
                };
                resizeCanvas();
                resizeObserver = new ResizeObserver(resizeCanvas);
                resizeObserver.observe(container);

                particlesRef.current = [];
                for (let i = 0; i < count; i++) {
                    const img = imgs[Math.floor(Math.random() * imgs.length)];
                    const speed = randomBetween(speedRange[0], speedRange[1]);
                    const angleRange = degToRad(mapValue(speed, speedRange[0], speedRange[1], rotateSwingRange, 5));
                    const angleSpeed = mapValue(speed, speedRange[0], speedRange[1], rotateSpeed, 0.005);

                    particlesRef.current.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        speed,
                        size: randomBetween(sizeRange[0], sizeRange[1]),
                        img,
                        driftX: drift ? randomBetween(-driftAmount, driftAmount) : 0,
                        angle: degToRad(angleInitial),
                        baseAngle: degToRad(angleInitial),
                        angleRange: rotate ? angleRange : 0,
                        angleSpeed: rotate ? angleSpeed : 0,
                        angleTime: Math.random() * Math.PI * 2,
                    });
                }

                const animate = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    for (const p of particlesRef.current) {
                        p.y += p.speed;
                        if (drift) p.x += p.driftX;

                        if (rotate) {
                            p.angleTime += p.angleSpeed;
                            p.angle = p.baseAngle + Math.sin(p.angleTime) * p.angleRange;
                        }

                        if (p.y > canvas.height || p.x < -p.size || p.x > canvas.width + p.size) {
                            p.y = -Math.random() * 100 - 50;
                            p.x = Math.random() * canvas.width;
                            p.angleTime = Math.random() * Math.PI * 2;
                        }

                        ctx.save();
                        ctx.globalAlpha = opacity;
                        ctx.filter = 'blur(1px)';

                        if (rotate || tiltWithDrift) {
                            ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
                            let totalAngle = 0;
                            if (rotate) totalAngle += p.angle;
                            if (tiltWithDrift) totalAngle += Math.atan2(-p.driftX, p.speed);
                            ctx.rotate(totalAngle);
                            ctx.translate(-p.size / 2, -p.size / 2);
                            ctx.drawImage(p.img, 0, 0, p.size, p.size);
                        } else {
                            ctx.drawImage(p.img, p.x, p.y, p.size, p.size);
                        }

                        ctx.restore();
                    }

                    // ✅ Optional overlay text on top
                    const overlayText = textOverlayRef.current;
                    if (overlayText) {
                        ctx.save();
                        ctx.font = "24px sans-serif";
                        ctx.fillStyle = "rgba(0,0,0,0.7)";
                        ctx.textAlign = "center";
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
    }, [
        count,
        speedRange,
        sizeRange,
        types,
        opacity,
        rotate,
        drift,
        angleInitial,
        rotateSwingRange,
        rotateSpeed,
        driftAmount,
        tiltWithDrift,
        props.textOverlay,
    ]);

    return (
        <div className={styles.container} ref={containerRef}>
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none', // So clicks go through the canvas
                    background: props.background ?? 'transparent',
                }}
            />
        </div>
    );
};

// ✅ Utility: Random number between min and max
function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
}

// ✅ Utility: Degrees to radians
function degToRad(deg: number) {
    return (deg * Math.PI) / 180;
}

// ✅ Utility: Map a number from one range to another
function mapValue(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    const ratio = (value - inMin) / (inMax - inMin);
    return outMin + ratio * (outMax - outMin);
}

export default FallingParticles;
