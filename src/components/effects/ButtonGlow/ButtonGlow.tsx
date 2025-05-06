import React from 'react';
import styles from './ButtonGlow.module.css'; // You can also use styled-components or Emotion

/**
 * ButtonGlow Component
 * ---------------------
 * A button with a glowing hover effect using CSS animation.
 * Suitable for call-to-action or interactive UI elements.
 */
const ButtonGlow = () => {
    return (
        <button className={styles.glowButton}>
            Hover Me
        </button>
    );
};

export default ButtonGlow;
