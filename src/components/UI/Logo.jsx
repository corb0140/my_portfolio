import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <ChevronLeft className="h-5 w-5" />
      <span className="text-sm font-bold">MC</span>

      <div className="flex items-center">
        <p className="relative left-1">/</p>
        <ChevronRight className="h-5 w-5" />
      </div>
    </div>
  );
}
