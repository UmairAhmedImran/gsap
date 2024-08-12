"use client";

import gsap, { Power2 } from "gsap";
import { useEffect, useRef } from "react";

export default function Home() {
  const container = useRef(null);
  let redBoxAnimation = useRef(null);
  let blueBoxAnimation = useRef(null);
  let greenBoxAnimation = useRef(null);
  let zincAnimation = useRef(null);
  let slateAnimation = useRef(null);
  let pinkAnimation = useRef(null);

  const gsapEffects = [
    {
      id: "fadeSlideTo",
      props: { opacity: 0.5, x: 300, yoyo: true, repeat: -1 },
    },
    {
      id: "fadeSlideFrom",
      animate: "from",
      props: { opacity: 0.25, x: 300, yoyo: true, repeat: -1 },
    },
    {
      id: "fadeSlideFromTo",
      animate: "fromTo",
      props: { opacity: 0.1, x: 300 },
      props2: { opacity: 1, x: 600, yoyo: true, repeat: -1 },
    },
  ];

  // register the effect with GSAP:
  gsap.registerEffect({
    name: "fade",
    defaults: { duration: 2 }, //defaults get applied to the "config" object passed to the effect below
    effect: (targets: any, config: any) => {
      return gsap.to(targets, {
        duration: config.duration,
        opacity: 0,
      });
    },
  });

  //now we can use it like this:
  //gsap.effects.fade(".box");

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(container.current, 0, { css: { visibility: "visible" } });
      gsap.to(slateAnimation.current, {
        duration: 1,
        ease: Power2.easeOut,
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        x: 80,
        y: 30,
      });
      gsap.to(pinkAnimation.current, {
        duration: 1,
        ease: Power2.easeOut,
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        x: 80,
        y: 30,
      });
    });

    // gsap.globalTimeline.timeScale(); //plays at half-speed
    // // gsap.globalTimeline.timeScale(2);
    // // gsap.globalTimeline.pause(2.5);
    // gsap.globalTimeline.play(2, true);
    document.querySelectorAll(".box").forEach(function (box) {
      box.addEventListener("mouseenter", () => {
        gsap.effects.fade(box);
      });
    });

    gsapEffects.forEach((effect) => {
      gsap.registerEffect({
        name: effect.id,
        defaults: { duration: 1 },
        extendTimeline: true,
        effect(targets: HTMLElement, config: any) {
          if (effect.animate === "from") {
            return gsap.from(targets, { ...effect.props, ...config });
          } else if (effect.animate === "fromTo") {
            return gsap.fromTo(
              targets,
              { ...effect.props, ...config },
              { ...effect.props2 }
            );
          } else {
            return gsap.to(targets, { ...effect.props, ...config });
          }
        },
      });
      return () => ctx.revert();
    });

    let tl = gsap.timeline();
    tl.fadeSlideTo(".fadeSlideTo")
      .fadeSlideFrom(".fadeSlideFrom", 0)
      .fadeSlideFromTo(".fadeSlideFromTo", 0);

    // now we can use it like this:
    gsap.effects.fade(greenBoxAnimation);
    gsap.to(redBoxAnimation.current, { x: 100, duration: 3, rotate: 360 });
    gsap.to(blueBoxAnimation.current, { x: -100, duration: 3, rotate: 360 });
  });

  return (
    <>
      <div className="main">
        <div ref={container} className="container">
          <div className="flex items-center justify-center ">
            <div
              ref={redBoxAnimation}
              className="h-44 w-52 border bg-red-500 mx-5 box"
            ></div>

            <div
              ref={greenBoxAnimation}
              className="h-44 w-52 border bg-green-500 mx-5 box"
            ></div>
            <div
              ref={blueBoxAnimation}
              className="h-44 w-52 border bg-blue-500 mx-5 box"
            ></div>
          </div>
          <div className="w-full justify-center items-center">
            <div className="h-20 w-20 bg-purple-900 text-white fadeSlideTo box">
              to
            </div>
            <div className="h-20 w-20 bg-black text-white fadeSlideFrom box">
              from
            </div>
            <div className="h-20 w-20 bg-gray-700 text-white fadeSlideFromTo box">
              fromTo
            </div>
          </div>
          <div className=" flex flex-col justify-center items-center space-y-10">
            <div
              ref={zincAnimation}
              className="rounded-full h-20 w-20 bg-zinc-700 text-white py-6 px-5"
            >
              Test1
            </div>
            <div
              ref={pinkAnimation}
              className="rounded-full h-20 w-20 bg-pink-700 text-white py-6 px-5"
            >
              Test2
            </div>
            <div
              ref={slateAnimation}
              className="rounded-full h-20 w-20 bg-slate-700 text-white py-6 px-5"
            >
              Test3
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
