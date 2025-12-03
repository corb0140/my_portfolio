import { useRef, useEffect } from "react";
import me from "@/assets/images/me.png";
import resume from "@/assets/resume.pdf";
import { Download, SquareArrowOutUpRight } from "lucide-react";
import gsap from "gsap";

function HomePage() {
  const bonjour = [..."Bonjour"];
  const hello = [..."Hello"];

  const bonjourRef = useRef(null);
  const helloRef = useRef(null);

  useEffect(() => {
    let tl;

    const startAnimation = () => {
      const translateY = window.innerWidth >= 768 ? 100 : 80;

      if (tl) tl.kill();

      gsap.set(bonjourRef.current.querySelectorAll("span"), { y: 0 });
      gsap.set(helloRef.current.querySelectorAll("span"), { y: 0 });

      tl = gsap.timeline({
        defaults: {
          duration: 2,
          ease: "power1.in",
          yoyo: true,
          repeat: -1,
          repeatDelay: 5,
        },
      });

      const bonjourLetters = bonjourRef.current.querySelectorAll("span");
      const helloLetters = helloRef.current.querySelectorAll("span");

      bonjourLetters.forEach((letter, index) =>
        tl.to(letter, { y: translateY }, index * 0.09)
      );

      helloLetters.forEach((letter, index) =>
        tl.to(letter, { y: translateY }, index * 0.09)
      );
    };

    startAnimation();

    const onResize = () => {
      startAnimation();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div className="h-[calc(100vh-56px)] w-full flex flex-col items-center overflow-hidden">
      <div className="h-auto flex flex-col gap-2 mt-10 md:self-start md:pl-8">
        <div className="relative overflow-hidden h-20 w-75 md:h-26 md:w-100 -z-10">
          <p
            ref={bonjourRef}
            className="text-7xl md:text-8xl font-normal absolute -top-20 md:-top-26"
          >
            {bonjour.map((letter, index) => (
              <span key={index} className="inline-block">
                {letter}
              </span>
            ))}
          </p>

          <p
            ref={helloRef}
            className="text-7xl md:text-8xl font-normal absolute"
          >
            {hello.map((letter, index) => (
              <span key={index} className="inline-block">
                {letter}
              </span>
            ))}
          </p>
        </div>

        <p className="text-sm md:text-xl font-normal">
          - I'm Mark Corbin, a frontend developer
        </p>
      </div>

      <div className="flex gap-5 mt-15 md:self-start md:pl-8">
        <a
          download
          href={resume}
          className="font-light tracking-wide flex items-center transition-all duration-500 hover:scale-105"
        >
          <p className="text-[16px] md:text-[22px]">Resume</p>

          <Download className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5" />
        </a>

        <a
          href="https://www.linkedin.com/in/mark-corbin-18771b9b/"
          target="_blank"
          className="font-light tracking-wide flex items-center transition-all duration-500 hover:scale-105"
        >
          <p className="text-[16px] md:text-[22px]">LinkedIn</p>

          <SquareArrowOutUpRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5" />
        </a>
      </div>

      <img
        src={me}
        alt=""
        className="grayscale-80 h-auto w-full object-cover mt-auto md:relative md:bottom-20"
      />
    </div>
  );
}

export default HomePage;
