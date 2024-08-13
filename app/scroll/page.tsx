"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to(scrollRef.current, {
      scrollTrigger: scrollRef.current, // start the animation when ".box" enters the viewport (once)
      x: 500,
      pin: true, // pin the trigger element while active
      start: "top top", // when the top of the trigger hits the top of the viewport
      end: "+=500", // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    });
  });

  return (
    <>
      <div className="w-20">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum vel
        ex iste deleniti nulla? Sint provident eveniet, id laboriosam eaque
        dignissimos ad fugiat! Neque saepe exercitationem optio atque illum
        quaerat?
      </div>
      <div
        className="flex items-center justify-center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div
          ref={scrollRef}
          className="bg-blue-600 h-20 w-20 rounded-full"
        ></div>
      </div>
    </>
  );
};

export default Home;
