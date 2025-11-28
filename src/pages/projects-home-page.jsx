import { useState, useEffect } from "react";
import { Link } from "react-router";

function ProjectsHomePage() {
  const [data, SetData] = useState([]);

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

  return (
    <div className="p-8 flex flex-col">
      <h1 className="uppercase tracking-wide text-2xl">My Projects</h1>

      <div className="mt-20 grid grid-cols-1 gap-8">
        {data.map((item, index) => (
          <Link to={item.link} key={index} className="flex flex-col gap-2">
            <div className="h-45 w-full border rounded-md">
              <img src={item.image} alt="" />
            </div>

            <h2>{item.title}</h2>

            <p className="text-sm">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectsHomePage;
