import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

function AboutPage() {
  const [data, setData] = useState([]);

  const backgroundRef = useRef(null);
  const frontendRef = useRef(null);
  const interestsRef = useRef(null);
  const technologiesRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 2, ease: "power1.In" },
    });

    tl.to(backgroundRef.current, {
      opacity: 1,
    })
      .to(
        interestsRef.current,
        {
          opacity: 1,
        },
        "<0.5"
      )
      .to(
        frontendRef.current,
        {
          opacity: 1,
        },
        "<0.5"
      )
      .to(
        technologiesRef.current,
        {
          opacity: 1,
        },
        "<0.5"
      );
  }, []);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const res = await fetch("/src/data/technologies.json");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.log("Error fetching data" + err);
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <div className="p-5">
      <h1 className="uppercase font-bold text-4xl max-w-50">Get to know me</h1>

      <div className="mt-10 flex flex-col gap-5 h-auto w-full">
        <span ref={backgroundRef} className="opacity-0">
          <h2 className="uppercase text-lg tracking-wide">Background</h2>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            praesentium necessitatibus commodi explicabo quos saepe, repellendus
            ipsa! Autem aliquid modi ex reprehenderit numquam voluptate ipsam
            distinctio eum voluptatum, at aut!
          </p>
        </span>

        <span ref={interestsRef} className="opacity-0">
          <h2 className="uppercase text-lg tracking-wide">Interests</h2>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            praesentium necessitatibus commodi explicabo quos saepe, repellendus
            ipsa! Autem aliquid modi ex reprehenderit numquam voluptate ipsam
            distinctio eum voluptatum, at aut!
          </p>
        </span>

        <span ref={frontendRef} className="opacity-0">
          <h2 className="uppercase text-lg tracking-wide">Why Frontend</h2>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            praesentium necessitatibus commodi explicabo quos saepe, repellendus
            ipsa! Autem aliquid modi ex reprehenderit numquam voluptate ipsam
            distinctio eum voluptatum, at aut!
          </p>
        </span>

        <span ref={technologiesRef} className="opacity-0">
          <h2 className="uppercase text-lg tracking-wide">Technologies</h2>

          {/* GRID & DRAGGABLE */}
          <div className="mt-3">
            {data.map((item, index) => (
              <span
                key={index}
                className="text-sm mt-2 mx-1 p-1 px-2 inline-block bg-primary/90 text-white rounded-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </span>
      </div>
    </div>
  );
}

export default AboutPage;
