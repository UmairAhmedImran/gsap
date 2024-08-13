"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Home: React.FC = () => {
  let mouseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mouseRef.current) {
      gsap.set(mouseRef.current, { xPercent: -50, yPercent: -50 });

      let xTo = gsap.quickTo(mouseRef.current, "x", {
        duration: 0.6,
        ease: "power3",
      });
      let yTo = gsap.quickTo(mouseRef.current, "y", {
        duration: 0.6,
        ease: "power3",
      });

      window.addEventListener("mousemove", (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      });
    }
  });
  return (
    <>
      <div ref={mouseRef} className="h-20 w-20 bg-green-600 rounded-full"></div>
    </>
  );
};

export default Home;
