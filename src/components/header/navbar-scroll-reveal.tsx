"use client";

import { useState, useEffect, ReactNode } from "react";

interface NavbarScrollRevealProps {
  children?: ReactNode;
}

export default function NavbarScrollEffect(props: NavbarScrollRevealProps) {
  // React hooks
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (
        (currentScrollY > lastScrollY && currentScrollY > 200) ||
        currentScrollY < 300
      ) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <div
      className={`w-full fixed z-80 transition-all 
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {props.children}
    </div>
  );
}
