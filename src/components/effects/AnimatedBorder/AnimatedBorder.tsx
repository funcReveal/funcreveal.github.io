import React from 'react'
import styles from './AnimatedBorder.module.css'

const AnimatedBorder = () => {
    return (
        <div className={styles.container}>
            <div className={styles.glow}></div>
            <div className={styles.placeholder}></div>
        </div>
    )
}

export default AnimatedBorder