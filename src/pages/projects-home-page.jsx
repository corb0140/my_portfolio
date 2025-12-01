import { useState, useEffect } from "react";
import { Link } from "react-router";
import MouseProjectHover from "../components/UI/MouseProjectHover";

function ProjectsHomePage() {
  const [data, SetData] = useState([]);
  const [showCursor, setShowCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <div className="p-8 flex flex-col">
        <h1 className="uppercase tracking-wide text-2xl">My Projects</h1>

        <div className="mt-20 grid grid-cols-1 gap-8">
          {data.map((item, index) => (
            <Link to={item.link} key={index} className="flex flex-col gap-2">
              <div
                className="h-45 w-full rounded-md hover:cursor-none bg-primary/90 flex flex-col items-center justify-center"
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

              <h2>{item.title}</h2>

              <p className="text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {showCursor && (
        <MouseProjectHover x={mousePosition.x} y={mousePosition.y} />
      )}
    </>
  );
}

export default ProjectsHomePage;
