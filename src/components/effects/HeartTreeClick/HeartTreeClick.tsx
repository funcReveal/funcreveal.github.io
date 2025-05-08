import React, { useState } from "react";
import styles from "./HeartTreeClick.module.css";

interface Heart {
    id: number;
    left: number;
    delay: number;
    duration: number;
}

const HeartTree = () => {
    const [hearts, setHearts] = useState<Heart[]>([]);

    const addHeart = () => {
        const newHeart: Heart = {
            id: Date.now(),
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 2,
        };
        setHearts((prev) => [...prev, newHeart]);
    };

    return (
        <div className={styles.container} onClick={addHeart}>
            <div className={styles.tree}>
                <div className={styles.trunk}></div>
            </div>
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className={styles.heart}
                    style={{
                        left: `${heart.left}%`,
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default HeartTree;
