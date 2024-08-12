"use client";
import gsap, { Power2 } from "gsap";
import { useEffect, useRef } from "react";

const About = () => {
  const container = useRef(null);
  const boxRef = useRef<HTMLDivElement | null>(null); // Reference to the box element
  const animationRef = useRef<GSAPTween | null>(null); // Reference to the GSAP animation
  const delayedAnimationElementRef = useRef<HTMLDivElement | null>(null); // Reference to the delayed animation element
  const delayedAnimationRef = useRef<gsap.core.Tween | null>(null); /// Reference to the delayed
  const delayedCallRef = useRef<gsap.core.Tween | null>(null); // Reference to the delayed call
  const myWindowRef = useRef<HTMLDivElement | null>(null); // Reference to the window element
  const myWindowRef2 = useRef<HTMLDivElement | null>(null); // Reference to the window element
  const obj1 = useRef(null);
  const obj2 = useRef(null);

  useEffect(() => {
    // Create a GSAP context and store the animation in animationRef
    const ctx = gsap.context(() => {
      gsap.to(container.current, 0, { css: { visibility: "visible" } });

      //this tween isn't affected because it's created after the export.
      gsap.fromTo(
        myWindowRef.current,
        { scaleX: 0, scaleY: 0 },
        { duration: 3, scaleX: 1, scaleY: 1 }
      );

      // Start a delayed call that will trigger `myFunction` after 5 seconds
      delayedCallRef.current = gsap.delayedCall(5, () => {
        delayedAnimationRef.current = gsap.to(
          delayedAnimationElementRef.current,
          {
            duration: 1,
            ease: Power2.easeOut,
            opacity: 0.5,
            repeat: -1,
            yoyo: true,
            x: 80,
            // onRepeat: repeatFunction(),
          }
        );
      });

      // Set up a delayed call to kill the `delayed` call after 10 seconds
      gsap.delayedCall(10, killFunction);

      var tl = gsap.exportRoot();
      gsap.to(tl, { duration: 0.5, timeScale: 0 });
      let tween = gsap.fromTo(
        myWindowRef2.current,
        { scaleX: 0, scaleY: 0 },
        { duration: 3, scaleX: 1, scaleY: 1 }
      );

      tween.delay(3);
      // tween.pause(1);
      tween.seek(0);
      // This animation is created and stored in animationRef
      animationRef.current = gsap.to(boxRef.current, {
        x: 100,
        duration: 2,
        paused: true, // Pause the animation initially
        repeat: -1,
        yoyo: true, // Repeat the animation indefinitely with a slight delay between each repetition
      });
    }, boxRef);

    gsap.to(obj1, { x: 100 });
    gsap.to(obj2, { x: 100 });
    gsap.to([obj1, obj2], { opacity: 0 });

    var a1 = gsap.getTweensOf(obj1); //finds 2 tweens
    var a2 = gsap.getTweensOf([obj1, obj2]); //finds 3 tweens
    console.log(a1, a2); // returns number of tweens

    // if (!gsap.isTweening("#id")) {
    //   // do stuff
    // }

    // // sometime later
    // delayed.kill();

    // Cleanup context when the component unmounts
    return () => {
      ctx.revert();
      // Ensure delayed calls are cleaned up
      if (delayedCallRef.current) {
        delayedCallRef.current.kill();
      }
    };
  }, []);

  const handleClick = () => {
    if (animationRef.current) {
      // Play the paused animation
      animationRef.current.play();
    }
  };

  const stopClick = () => {
    if (animationRef.current) {
      // Play the paused animation
      animationRef.current.pause();
    }
  };

  const killFunction = () => {
    if (delayedAnimationRef.current) {
      delayedAnimationRef.current.kill(); // Stop the animation on the delayed element
      console.log("Delayed animation killed.");
    }
  };
  // const repeatFunction: gsap.Callback | "undefined" = () => {
  //   console.log("I'm repeating!");
  // };

  gsap.getProperty("#id", "x"); // 20 // gets the current value of any property defined

  //   gsap.killTweensOf(myObject, "opacity,x"); // kill the properties
  // gsap.killTweensOf(".myClass"); kill the tween
  return (
    <>
      <div className="main">
        <div ref={container} className="container">
          <div
            ref={boxRef}
            className="h-44 w-52 border bg-purple-500 mx-5 box"
          ></div>

          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Click me!
          </button>
          <button
            onClick={stopClick}
            className="bg-red-500 hover:bg-red-700 text-white font-bold mx-5  py-2 px-4 rounded"
          >
            Click me!
          </button>
          <div className="flex items-center justify-center">
            <div
              ref={delayedAnimationElementRef}
              className="rounded-full h-20 w-20 bg-stone-600"
            ></div>
          </div>
          <div
            ref={myWindowRef}
            className="py-10 px-10 h-30 w-30 flex items-center justify-center bg-yellow-500"
          ></div>
          <div
            ref={myWindowRef2}
            className="py-10 px-10 h-30 w-full flex items-center justify-center bg-teal-700"
          ></div>
          <div
            ref={obj1}
            className="py-10 mx-52 my-10 px-10 h-30 w-20 rounded-full items-center justify-center bg-cyan-800"
          ></div>
          <div
            ref={obj2}
            className="py-10 px-10 mx-52 my-10 h-30 w-20 rounded-full items-center justify-center bg-violet-800"
          ></div>
        </div>
      </div>
    </>
  );
};

export default About;
