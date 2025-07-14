import React, { useState } from "react";
import styles from "./ShutterEffect.module.css";

const ShutterEffect = () => {
  const [closed, setClosed] = useState(false);
  const blades = Array.from({ length: 6 });

  return (
    <div className={styles.shutterBox} onClick={() => setClosed(!closed)}>
      {blades.map((_, index) => (
        <div
          key={index}
          className={`${styles[`blade-${index}`]} ${
            closed ? "" : styles.closed
          }`}
          style={{ width: "5%", height: "5%", transform: "scale(11)" }}
        >
          {/* {index} */}
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default ShutterEffect;
