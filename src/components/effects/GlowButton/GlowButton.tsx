import React from 'react';
import styles from './GlowButton.module.css'; // You can also use styled-components or Emotion

/**
 * GlowButton Component
 * ---------------------
 * A button with a glowing hover effect using CSS animation.
 * Suitable for call-to-action or interactive UI elements.
 */
const GlowButton = () => {
    return (
        <button className={styles.glowButton}>
            Hover Me
        </button>
    );
};

export default GlowButton;
