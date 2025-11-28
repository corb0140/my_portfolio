import me from "@/assets/images/me.png";
import resume from "@/assets/resume.pdf";
import { Download, SquareArrowOutUpRight } from "lucide-react";

function HomePage() {
  return (
    <div className="h-[calc(100vh-56px)] w-full flex flex-col">
      <div className="h-auto w-full flex flex-col gap-2 mt-10 px-10">
        <p className="text-8xl font-normal">Hello</p>

        <p className="text-sm font-normal">
          - It's M. Corbin, a frontend developer
        </p>
      </div>

      <div className="flex justify-center gap-5 mt-15 px-10">
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
        className="grayscale-80 h-1/2 w-full object-cover mt-auto -z-10"
      />
    </div>
  );
}

export default HomePage;
