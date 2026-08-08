"use client";

import { AnimatePresence } from "framer-motion";

export default function MotionLayout({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <AnimatePresence mode="wait" initial={true}>
      {children}
    </AnimatePresence>
  );
}
