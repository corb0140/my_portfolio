import { ArrowUpRight } from "lucide-react";

function MouseProjectHover({ x, y }) {
  return (
    <div
      className="h-25 w-25 rounded-full bg-primary/80 pointer-events-none fixed z-1000"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <ArrowUpRight className="absolute top-5 right-6 text-white" />
      <p className="text-white text-[10px] absolute top-10 right-4">
        View Project
      </p>
    </div>
  );
}

export default MouseProjectHover;
