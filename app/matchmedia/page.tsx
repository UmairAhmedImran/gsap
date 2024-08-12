"use client";

import gsap, { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

const matchMedia = () => {
  gsap.registerPlugin(ScrollTrigger);
  let matchMediraRef1 = useRef(null);
  let matchMediraRef2 = useRef(null);
  let desktopRef = useRef(null);
  let mobileRef = useRef(null);
  let containerRef = useRef(null);
  let clickRef = useRef(null);
  const myButton = useRef<HTMLButtonElement | null>(null);
  let mm = gsap.matchMedia(),
    breakPoint = 800;

  useEffect(() => {
    mm.add("(min-width: 800px)", (context) => {
      context.add("onClick", () => {
        gsap.to(myButton.current, {
          rotation: "+=360",
          duration: 1,
          ease: Power2.easeIn,
        });
      });
      if (myButton.current) {
        myButton?.current.addEventListener("click", context.onClick);
      }

      return () => {
        if (myButton.current) {
          myButton?.current.removeEventListener("click", context.onClick);
        }
      };
    });
    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        let { isDesktop, isMobile, reduceMotion }: any = context.conditions;

        // Common timeline reset function
        const resetTimeline = () => {
          gsap.set([desktopRef.current, mobileRef.current], {
            rotation: 0,
            scale: 1,
          });
        };

        // Call reset before any animation starts
        resetTimeline();

        gsap.to(".box", {
          rotation: isDesktop ? 360 : 180, // spin further if desktop
          duration: reduceMotion ? 0 : 2, // skip to the end if prefers-reduced-motion
        });
      }
    );
    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
        isMobile: `(max-width: ${
          breakPoint - 1
        }px) and (prefers-reduced-motion: no-preference)`,
      },
      (context) => {
        let { isDesktop, isMobile }: any = context.conditions,
          target = isDesktop ? desktopRef.current : mobileRef.current,
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              scrub: 1,
              end: "200%",
              pin: true,
            },
          });
        tl.to(target, { scale: 2, rotation: 360 }).to(target, {
          scale: 1,
          rotation: 0,
        });
        gsap.to(target, {
          backgroundColor: "#2c7ad2",
          duration: 0.8,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }
    );
    mm.add("(min-width: 800px)", () => {
      gsap.to(matchMediraRef1.current, {
        duration: 2,
        x: 200,
        y: 10,
        z: 10,
        ease: Power2.easeInOut,
        repeat: -1,
        yoyo: true,
      });
    });
    mm.add("(max-width: 799px)", () => {
      gsap.to(matchMediraRef2.current, {
        duration: 3,
        x: 10,
        y: 200,
        z: 10,
        ease: Power2.easeInOut,
        repeat: -1,
        yoyo: true,
      });
    });
    // Clean up GSAP animations when component unmounts
    return () => {
      // make sure to clean up event listeners in the cleanup function!

      mm.revert();
    };
  }, []);
  return (
    <>
      <div className="flex flex-col mx-10 my-20 space-y-5">
        <div
          ref={matchMediraRef1}
          className="rounded-full bg-gray-800 h-24 w-24 text-white"
        ></div>
        <div
          ref={matchMediraRef2}
          className="rounded-full bg-pink-600 h-24 w-24"
        ></div>
      </div>
      <div className="flex flex-col space-y-10 justify-center items-center">
        <div className="bg-blue-900 h-24 w-24 box"></div>
      </div>
      <div
        ref={containerRef}
        className="flex m-20 space-x-32 justify-center items-center relative h-screen"
      >
        <div
          ref={desktopRef}
          className="h-24 w-24 bg-red-900 text-center items-center py-5"
        >
          DESKTOP
        </div>
        <div
          ref={mobileRef}
          className="h-24 w-24 bg-green-900 text-center items-center py-5"
        >
          MOBILE
        </div>
      </div>
      <div className="flex m-10 items-center justify-center">
        <button
          ref={myButton}
          className="h-12 w-20 bg-violet-400 hover:bg-violet-700 hover:text-lg"
        >
          Click me
        </button>
      </div>
    </>
  );
};
export default matchMedia;
