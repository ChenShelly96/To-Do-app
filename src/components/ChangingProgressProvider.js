// src/components/ChangingProgressProvider.js
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";

const ChangingProgressProvider = ({ children, values }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [index, values]);

  const props = useSpring({ value: values[index], from: { value: 0 } });

  return (
    <animated.div style={{ width: '100%', height: '100%' }}>
      {children(props.value)}
    </animated.div>
  );
};

export default ChangingProgressProvider;
