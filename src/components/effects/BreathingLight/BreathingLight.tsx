// BreathingLight.tsx
// Simple breathing‑light component. Customize size, color and duration via props.
import React from 'react';
import styles from './BreathingLight.module.css';

export interface BreathingLightProps {
    /** Diameter in px (default 24) */
    size?: number;
    /** Base glow color (default #00e5ff) */
    color?: string;
    /** Breathing cycle in seconds (default 3) */
    duration?: number;
}

const BreathingLight: React.FC<BreathingLightProps> = ({
    size = 24,
    color = '#00e5ff',
    duration = 3,
}) => {
    // Pass CSS variables to the style prop.
    const style: React.CSSProperties & Record<string, string> = {
        '--size': `${size}px`,
        '--color': color,
        '--duration': `${duration}s`,
    };
    return <span className={styles.breathingLight} style={style} />;
};

export default BreathingLight;