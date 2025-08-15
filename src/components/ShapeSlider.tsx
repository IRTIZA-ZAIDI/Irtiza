import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const ShapeSlider = ({ shapes, speed = 50 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.scrollHeight / 2;

    controls.start({
      y: [-0, -height],
      transition: { duration: height / speed, ease: "linear", repeat: Infinity },
    });
  }, [shapes, speed, controls]);

  // Duplicate shapes for seamless scroll
  const loopedShapes = [...shapes, ...shapes];

  return (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full w-1/3 overflow-hidden">
      <motion.div
        ref={containerRef}
        animate={controls}
        className="flex flex-col items-center justify-start h-full"
      >
        {loopedShapes.map((shape, idx) => (
          <img
            key={idx}
            src={shape}
            alt={`shape-${idx}`}
            className="w-24 h-24 mb-8 dark:invert"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ShapeSlider;
