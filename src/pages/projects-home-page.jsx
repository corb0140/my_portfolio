import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import MouseProjectHover from "../components/UI/MouseProjectHover";
import { MoveDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectsHomePage() {
  const [data, SetData] = useState([]);
  const [showCursor, setShowCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const moveDownRef = useRef(null);
  const overlayRefs = useRef([]);
  const imageRefs = useRef([]);

  // FETCH DATA
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const res = await fetch("/src/data/projects.json");
        const json = await res.json();
        SetData(json);
      } catch (err) {
        console.log("Error fetching data" + err);
      }
    };

    fetchProjectsData();
  }, []);

  // MOUSE MOVE ANIMATION
  useEffect(() => {
    const handleMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // ARROW DOWN ANIMATION
  useEffect(() => {
    gsap.to(moveDownRef.current, {
      y: 10,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  // SCROLL TRIGGER
  useEffect(() => {
    if (!data.length) return;

    requestAnimationFrame(() => {
      overlayRefs.current.forEach((overlay, index) => {
        const image = imageRefs.current[index];

        if (!overlay || !image) return;

        const parent = overlay.parentElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: parent,
            start: "top 40%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          overlay,
          { x: 0 },
          {
            x: "-100%",
            duration: 1,
            ease: "power3.out",
          }
        ).to(
          image,
          {
            scale: 0.5,
            duration: 0.5,
          },
          "<.1"
        );
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [data]);

  // SCROLL SNAP
  useEffect(() => {
    const handleSnap = () => {
      const section = document.getElementById("projectsSection");
      if (!section) return;

      window.removeEventListener("scroll", handleSnap);

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    window.addEventListener("scroll", handleSnap, { once: true });

    return () => window.removeEventListener("scroll", handleSnap);
  }, []);

  // IMAGE SCALE AND CUSTOM CURSOR BOOLEAN
  const handleMouseEnter = (index) => {
    setShowCursor(true);

    gsap.to(imageRefs.current[index], {
      scale: 0.6,
    });
  };

  const handleMouseLeave = (index) => {
    setShowCursor(false);

    gsap.to(imageRefs.current[index], {
      scale: 0.5,
    });
  };

  return (
    <>
      {/* MOBILE AND TABLET SCREEN */}
      <div className="p-4 flex flex-col lg:top-17 relative lg:hidden">
        <h1 className="uppercase tracking-wide text-2xl md:text-4xl">
          My Projects
        </h1>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="flex flex-col lg:flex-row gap-2 md:gap-3"
            >
              {/* IMAGE */}
              <div
                className="h-60 lg:h-100 w-full lg:max-w-[400px] rounded-md hover:cursor-none bg-primary/90 flex flex-col items-center justify-center"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                {item.title.toLowerCase() === "workout" ? (
                  <p className="tracking-wider font-inter uppercase text-2xl font-bold text-white">
                    WORKOUT
                  </p>
                ) : (
                  <>
                    <img
                      src={item.image}
                      alt={`Image of ${item.title} logo`}
                      className="h-22 w-22"
                    />

                    <p className="text-white text-sm">{item.title}</p>
                  </>
                )}
              </div>

              <div className="lg:flex lg:flex-col lg:gap-2">
                {/* 'TITLE' */}
                <h2 className="md:text-xl">{item.title}</h2>

                {/* DESCRIPTION */}
                <p className="text-sm md:text-lg">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* LARGE SCREEN */}
      <div className="hidden h-auto w-full lg:flex flex-col px-30 pb-20">
        <div className="relative mt-17 h-[calc(100vh-68px)] w-full flex flex-col justify-center">
          <span className="text-8xl font-bold font-inter">Selected</span>
          <span className="text-6xl italic font-inter font-light">
            Projects
          </span>

          <MoveDown
            ref={moveDownRef}
            className="absolute left-[50%] -translate-x-[50%] bottom-15 h-7 w-7 text-primary/70"
          />
        </div>

        <div
          id="projectsSection"
          className="flex flex-col h-auto w-full relative py-20"
        >
          <h1 className="uppercase text-7xl font-inter">Projects</h1>

          {/* PROJECTS CONTAINER */}
          <div className="mt-20 flex flex-col gap-50">
            {data.map((item, index) => (
              <div key={index} className="h-[64vh] w-full flex gap-5">
                {/* NAME AND TECH */}
                <div className="flex flex-col gap-5">
                  <p className="font-semibold">{item.title}</p>

                  <div className="border-b-[1.5px] border-primary/80 border-b-sm w-60"></div>

                  <div className="flex flex-wrap gap-2 max-w-80">
                    {item.tech.map((tech, index) => (
                      <span key={index} className="text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-sm max-w-80">{item.description}</span>
                </div>

                {/* PROJECT IMAGE AND LINK */}
                <div className="px-20 w-full ">
                  <div className="h-full w-full rounded-4xl shadow-[2px_2px_6px_rgba(0,0,0,.5)] overflow-hidden relative">
                    {/* SHADER BLACK */}
                    <div
                      ref={(el) => (overlayRefs.current[index] = el)}
                      className="h-full w-full rounded-4xl bg-primary absolute top-0 left-0 z-10 "
                    ></div>

                    <Link
                      to={item.link}
                      className="h-full w-full relative cursor-none"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    >
                      <div className="bg-primary/90 h-full w-full">
                        <img
                          ref={(el) => (imageRefs.current[index] = el)}
                          className="h-full w-full object-contain relative"
                          src={item.image}
                          alt={`image of ${item.title} project`}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CUSTOM CURSOR */}
      {showCursor && (
        <MouseProjectHover x={mousePosition.x} y={mousePosition.y} />
      )}
    </>
  );
}

export default ProjectsHomePage;
