"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Home = () => {
  let mouseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mouseRef.current) {
      gsap.set(mouseRef.current, { xPercent: -50, yPercent: -50 });
      let xSetter = gsap.quickSetter(mouseRef.current, "x", "px");
      let ySetter = gsap.quickSetter(mouseRef.current, "y", "px");

      window.addEventListener("mousemove", (e) => {
        xSetter(e.clientX);
        ySetter(e.clientY);
      });
    }
  });
  return (
    <div>
      <div ref={mouseRef} className="h-20 w-20 bg-red-600 rounded-full"></div>
    </div>
  );
};

export default Home;
