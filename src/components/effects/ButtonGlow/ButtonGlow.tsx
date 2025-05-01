import React from 'react'
import styles from './ButtonGlow.module.css' // You can also use styled-components or Emotion

const ButtonGlow = () => {
    return (
        <button className={styles.glowButton}>
            Hover Me
        </button>
    )
}

export default ButtonGlow
