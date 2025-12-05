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
      const translateY =
        (window.innerWidth >= 768) & (window.innerWidth < 1024)
          ? 100
          : window.innerWidth >= 1024
          ? 120
          : 80;

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
    <div className="h-[calc(100vh-56px)] lg:h-screen w-full flex flex-col lg:flex-row items-center lg:items-start lg:gap-10 overflow-hidden">
      {/* RESUME, LINKEDIN & GREETING */}
      <div className="flex flex-col items-center lg:flex-col-reverse lg:pl-50 lg:grow lg:mt-35">
        <div className="h-auto flex flex-col gap-2 mt-10 lg:mt-35 lg:w-full">
          {/* GREETING */}
          <div className="relative overflow-hidden h-20 w-75 md:h-26 lg:h-32 md:w-100 lg:w-130 -z-10">
            <p
              ref={bonjourRef}
              className="text-7xl md:text-8xl lg:text-9xl font-normal absolute -top-20 md:-top-26 lg:-top-34"
            >
              {bonjour.map((letter, index) => (
                <span key={index} className="inline-block">
                  {letter}
                </span>
              ))}
            </p>

            <p
              ref={helloRef}
              className="text-7xl md:text-8xl lg:text-9xl font-normal absolute"
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

        {/* RESUME AND LINKEDIN */}
        <div className="flex md:justify-center lg:justify-start gap-5 mt-15 lg:mt-30 md:w-full">
          <a
            download
            href={resume}
            className="font-light tracking-wide flex items-center transition-all duration-500 hover:scale-105"
          >
            <p className="text-[16px] md:text-[22px] lg:text-[16px]">Resume</p>

            <Download className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5 lg:h-3.5 lg:w-3.5" />
          </a>

          <a
            href="https://www.linkedin.com/in/mark-corbin-18771b9b/"
            target="_blank"
            className="font-light tracking-wide flex items-center transition-all duration-500 hover:scale-105"
          >
            <p className="text-[16px] md:text-[22px] lg:text-[16px]">
              LinkedIn
            </p>

            <SquareArrowOutUpRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5 lg:h-3.5 lg:w-3.5" />
          </a>
        </div>
      </div>

      {/* IMAGE */}
      <img
        src={me}
        alt=""
        className="grayscale-80 h-auto lg:h-screen w-full lg:w-[50%] object-cover mt-auto lg:ml-auto md:relative md:bottom-20 lg:-bottom-35"
      />
    </div>
  );
}

export default HomePage;
