import { ArrowUpRight } from "lucide-react";

function MouseProjectHover({ x, y }) {
  return (
    <div
      className="h-20 w-20 rounded-full bg-primary/80 pointer-events-none fixed z-1000"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <ArrowUpRight className="absolute top-4 right-5 text-white" />
      <p className="text-white text-[10px] absolute top-8 right-2">
        View Project
      </p>
    </div>
  );
}

export default MouseProjectHover;
