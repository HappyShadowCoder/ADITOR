import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const Star = ({ x, y, delay, mouseX, mouseY }) => {
  const starX = parseFloat(x); // in %
  const starY = parseFloat(y); // in %

  // Convert star position to pixels
  const starXPx = (starX / 100) * window.innerWidth;
  const starYPx = (starY / 100) * window.innerHeight;

  const dx = starXPx - mouseX;
  const dy = starYPx - mouseY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const repelRadius = 150; // pixels
  const strength = 30; // multiplier for push-back

  // If within range, calculate repulsion
  let offsetX = 0;
  let offsetY = 0;
  if (dist < repelRadius && dist > 0) {
    const factor = (repelRadius - dist) / repelRadius;
    offsetX = (dx / dist) * factor * strength;
    offsetY = (dy / dist) * factor * strength;
  }

  return (
        <motion.div
        animate={{
            x: offsetX,
            y: offsetY,
        }}
        transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 0.1,
        }}
        className="absolute bg-transparent"
        style={{ top: y, left: x }}
        >
        <motion.div
            animate={{ opacity: [0.3, 0.5, 0.2, 0.6], y: [-1, 1, -2] }}
            transition={{
            duration: 5,
            delay,
            repeat: Infinity,
            repeatType: "mirror",
            }}
            className="w-1 h-1 bg-white rounded-full"
        />
        </motion.div>
  );
};


  const stars = Array.from({ length: 150 }, () => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
  }));

function StarBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {stars.map((star, i) => (
        <Star key={i} {...star} mouseX={mouse.x} mouseY={mouse.y} />
      ))}
    </div>
  );
}

export default StarBackground;
