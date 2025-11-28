import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { SquareArrowOutUpRight } from "lucide-react";

function ProjectPage() {
  const { projectId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const fetchProjectData = async () => {
        const res = await fetch("/src/data/projects.json");
        const json = await res.json();

        const project = json.find((item) => item.id === projectId);

        setData(project);
      };

      fetchProjectData();
    } catch (err) {
      console.log("Error fetching data" + err);
    }
  }, [projectId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="h-auto p-5 flex flex-col gap-5">
      <div className="mt-10 mb-20">
        <h1 className="uppercase font-bold text-4xl max-w-100 tracking-wide">
          {data.title}
        </h1>
      </div>

      <div className="h-80 w-full border rounded-md">
        <img src={data.image} alt={data.title + " image"} />
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {data.tech?.map((item, index) => (
          <span
            key={item + index}
            className="text-sm p-1.5 rounded-sm text-primary border border-primary"
          >
            {item}
          </span>
        ))}
      </div>

      <p>{data.description}</p>

      <div className="flex gap-3">
        <a
          href={data.external_links?.demo}
          target="_blank"
          className="bg-primary/90 py-2.5 px-4.5 text-sm flex items-center gap-1 text-tertiary rounded-sm"
        >
          Demo
          <SquareArrowOutUpRight className="h-4 w-4" />
        </a>
        <a
          href={data.external_links?.github}
          target="_blank"
          className="bg-primary/90 py-2.5 px-4.5 text-sm flex items-center gap-1 text-tertiary rounded-sm"
        >
          Github
          <SquareArrowOutUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <h2 className="text-primary/90 uppercase text-[17px]">
          Why This Project
        </h2>

        <div className="flex flex-col gap-3">
          {data.motive?.map((para, index) => (
            <span key={index}>{para}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
