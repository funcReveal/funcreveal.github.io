import React from "react";
import styles from "./HeartTree.module.css";

const HeartTree = () => {
    return (
        <div className={styles.container}>
            <div className={styles.tree}>
                <div className={styles.trunk}></div>
            </div>
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className={styles.heart}
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                />
            ))}
        </div>
    );

}
export default HeartTree;
