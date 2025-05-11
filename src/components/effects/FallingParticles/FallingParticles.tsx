import React, { useRef, useEffect } from 'react';

// ✅ Import image assets for various particle types
import heart from './assets/heart.png';
import maple from './assets/maple.png';
import drop from './assets/drop.png';
import snowflake from './assets/snowflake.png';
import bubble from './assets/bubble.png';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import carnation from './assets/carnation.png';

import styles from './FallingParticles.module.css';

// ✅ Props to control the behavior and appearance of falling particles
interface FallingParticlesProps {
    count?: number; // Number of particles to display
    speedRange?: [number, number]; // Particle falling speed range [min, max]
    sizeRange?: [number, number]; // Particle size range [min, max]
    types?: (
        | 'heart'
        | 'maple'
        | 'drop'
        | 'rain'
        | 'bubble'
        | 'snow'
        | 'snowflake'
        | 'carnation'
        | 'all'
    )[];
    opacity?: number; // Opacity level for particles
    rotate?: boolean; // Whether particles should rotate (swing left/right)
    drift?: boolean; // Whether particles should drift sideways
    angleInitial?: number; // Initial angle in degrees
    rotateSwingRange?: number; // Rotation swing range in degrees
    rotateSpeed?: number; // Speed of rotation animation
    driftAmount?: number; // Sideways drift range
    tiltWithDrift?: boolean; // Whether to tilt particles based on drift direction
    textOverlay?: string;
}

// ✅ Map particle type strings to their corresponding image
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

// ✅ Internal structure to store individual particle state
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

// ✅ Return default properties for each particle type (used when not explicitly provided)
function getDefaultsByType(type: string) {
    switch (type) {
        case 'rain':
            return { rotate: false, drift: true, tiltWithDrift: true, speedRange: [1, 2], sizeRange: [2, 8], opacity: 1, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.3 };
        case 'drop':
            return { rotate: false, drift: true, tiltWithDrift: false, speedRange: [1, 2], sizeRange: [2, 8], opacity: 1, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.3 };
        case 'heart':
            return { rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.1, 1], sizeRange: [20, 40], opacity: 0.85, rotateSwingRange: 15, rotateSpeed: 0.015, driftAmount: 0.2 };
        case 'maple':
            return { rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.1, 0.2], sizeRange: [24, 48], opacity: 0.8, rotateSwingRange: 45, rotateSpeed: 0.03, driftAmount: 0.1 };
        case 'bubble':
            return { rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.3, 0.8], sizeRange: [10, 20], opacity: 0.8, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 1.0 };
        case 'carnation':
            return { rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 };
        case 'snow':
        case 'snowflake':
            return { rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [8, 16], opacity: 0.5, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.4 };
        default:
            return { rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 };
    }
}

const FallingParticles: React.FC<FallingParticlesProps> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas element for drawing
    const containerRef = useRef<HTMLDivElement | null>(null); // Container that defines the drawing area size
    const particlesRef = useRef<Particle[]>([]); // All current particles
    const animationRef = useRef<number | null>(null); // Animation frame ID for canceling

    // ✅ Extract props with fallback to defaults per type
    const {
        types = ['carnation'],
        count = 50,
        angleInitial = 0,
    } = props;

    const primaryType = types.includes('all') ? 'default' : types[0];
    const defaults = getDefaultsByType(primaryType);

    const rotate = props.rotate ?? defaults.rotate;
    const drift = props.drift ?? defaults.drift;
    const speedRange = props.speedRange ?? defaults.speedRange;
    const sizeRange = props.sizeRange ?? defaults.sizeRange;
    const opacity = props.opacity ?? defaults.opacity;
    const rotateSwingRange = props.rotateSwingRange ?? defaults.rotateSwingRange;
    const rotateSpeed = props.rotateSpeed ?? defaults.rotateSpeed;
    const driftAmount = props.driftAmount ?? defaults.driftAmount;
    const tiltWithDrift = props.tiltWithDrift ?? defaults.tiltWithDrift;

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // ✅ Load image and return as HTMLImageElement
        const loadImage = (src: string | { src: string }): Promise<HTMLImageElement> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = typeof src === 'string' ? src : src.src;
                img.onload = () => resolve(img);
                img.onerror = reject;
            });

        let resizeObserver: ResizeObserver;

        const init = async () => {
            try {
                // ✅ Choose which particle images to load
                const selectedTypes = types.includes('all') ? Object.keys(particleImageMap) : types;
                const imageSources = selectedTypes.map(
                    (type) => particleImageMap[type as keyof typeof particleImageMap]
                );

                const imgs = await Promise.all(imageSources.map(loadImage));

                const resizeCanvas = () => {
                    canvas.width = container.offsetWidth;
                    canvas.height = container.offsetHeight;
                };
                resizeCanvas();

                resizeObserver = new ResizeObserver(resizeCanvas);
                resizeObserver.observe(container);

                // ✅ Initialize particles
                particlesRef.current = [];

                for (let i = 0; i < count; i++) {
                    const img = imgs[Math.floor(Math.random() * imgs.length)];
                    const speed = randomBetween(speedRange[0], speedRange[1]);
                    const angleRange = degToRad(mapValue(speed, speedRange[0], speedRange[1], rotateSwingRange, 5));
                    const angleSpeed = mapValue(speed, speedRange[0], speedRange[1], rotateSpeed, 0.005);

                    particlesRef.current.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height, // 只在畫面上方 80% 高度隨機
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

                        // ✅ Recycle particle if out of view
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
                            if (tiltWithDrift) totalAngle += Math.atan2(-p.driftX, p.speed); // ✅ Tilt based on drift direction

                            ctx.rotate(totalAngle);
                            ctx.translate(-p.size / 2, -p.size / 2);
                            ctx.drawImage(p.img, 0, 0, p.size, p.size);
                        } else {
                            ctx.drawImage(p.img, p.x, p.y, p.size, p.size);
                        }

                        ctx.restore();
                    }
                    if (props.textOverlay) {
                        ctx.save();
                        ctx.font = "24px sans-serif";
                        ctx.fillStyle = "rgba(255,255,255,0.9)";
                        ctx.textAlign = "center";
                        ctx.fillText(props.textOverlay, canvas.width / 2, 50);
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
        <div className={styles.container} ref={containerRef} >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none', // ✅ Canvas does not interfere with mouse events
                }}
            />
        </div>
    );
};

// ✅ Generate a random number between two values
function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
}

// ✅ Convert degrees to radians for rotation calculations
function degToRad(deg: number) {
    return (deg * Math.PI) / 180;
}

// ✅ Remap a number from one range to another (used for scaling speed to angle/swing)
function mapValue(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    const ratio = (value - inMin) / (inMax - inMin);
    return outMin + ratio * (outMax - outMin);
}

export default FallingParticles;
