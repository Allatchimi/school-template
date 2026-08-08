import "../../styles/motion.css";

type MotionProps = Readonly<{ children?: React.ReactNode }>;

function MotionPageTransitionFromBottom({ children }: MotionProps) {
  return <div className="motion-fade-slide-from-bottom enter">{children}</div>;
}

function MotionPageTransitionFromTop({ children }: MotionProps) {
  return <div className="motion-fade-slide-from-top enter">{children}</div>;
}

function MotionPageTransitionFromLeft({ children }: MotionProps) {
  return <div className="motion-fade-slide-from-left enter">{children}</div>;
}

export {
  MotionPageTransitionFromBottom,
  MotionPageTransitionFromTop,
  MotionPageTransitionFromLeft,
};
