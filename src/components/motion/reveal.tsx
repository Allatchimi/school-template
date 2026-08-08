"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export function MotionRevealFromTop({
  children,
  delay = 0.15,
}: Readonly<{ children?: React.ReactNode; delay?: number }>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    return () => {};
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: 0.4,
        delay: delay ?? undefined,
      }}
      style={{
        width: "100%",
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionRevealFromBottom({
  children,
  delay = 0.15,
}: Readonly<{ children?: React.ReactNode; delay?: number }>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    return () => {};
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: 0.4,
        delay: delay ?? undefined,
      }}
      style={{
        width: "100%",
      }}
    >
      {children}
    </motion.div>
  );
}
