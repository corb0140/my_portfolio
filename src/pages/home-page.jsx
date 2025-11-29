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
    if (!bonjourRef.current || !helloRef.current) return;

    const tl = gsap.timeline({
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
      tl.to(letter, { y: "80px" }, index * 0.09)
    );

    helloLetters.forEach((letter, index) =>
      tl.to(letter, { y: "80px" }, index * 0.09)
    );
  });

  return (
    <div className="h-[calc(100vh-56px)] w-full flex flex-col items-center">
      <div className="h-auto flex flex-col gap-2 mt-10">
        <div className="relative overflow-hidden h-20 w-75 -z-10">
          <p
            ref={bonjourRef}
            className="test text-7xl font-normal absolute -top-20"
          >
            {bonjour.map((letter, index) => (
              <span key={index} className="inline-block">
                {letter}
              </span>
            ))}
          </p>

          <p ref={helloRef} className="text-7xl font-normal absolute">
            {hello.map((letter, index) => (
              <span key={index} className="inline-block">
                {letter}
              </span>
            ))}
          </p>
        </div>

        <p className="text-sm font-normal">
          - I'm Mark Corbin, a frontend developer
        </p>
      </div>

      <div className="flex gap-5 mt-15">
        <a
          download
          href={resume}
          className="font-light tracking-wide flex items-center transition-all duration-500 hover:scale-105"
        >
          <p className="text-[16px]">Resume</p>

          <Download className="ml-2 h-4 w-4" />
        </a>

        <a
          href="https://www.linkedin.com/in/mark-corbin-18771b9b/"
          target="_blank"
          className="font-light tracking-wide flex items-center transition-all duration-500 hover:scale-105"
        >
          <p className="text-[16px]">LinkedIn</p>

          <SquareArrowOutUpRight className="ml-2 h-4 w-4" />
        </a>
      </div>

      <img
        src={me}
        alt=""
        className="grayscale-80 h-1/2 w-full object-cover mt-auto"
      />
    </div>
  );
}

export default HomePage;
