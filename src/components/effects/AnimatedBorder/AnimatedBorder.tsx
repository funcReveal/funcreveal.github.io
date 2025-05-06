import React from 'react';
import styles from './AnimatedBorder.module.css';

/**
 * AnimatedBorder Component
 * ------------------------
 * Renders a circular placeholder with a rotating colorful glow ring behind it.
 * This is commonly used for avatars or badges with visual effects.
 */
const AnimatedBorder = () => {
    return (
        <div className={styles.container}>
            {/* Colorful rotating glow behind the circle */}
            <div className={styles.glow}></div>

            {/* Foreground placeholder (can represent avatar) */}
            <div className={styles.placeholder}></div>
        </div>
    );
};

export default AnimatedBorder;
