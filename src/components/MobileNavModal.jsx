import { forwardRef } from "react";
import Logo from "./UI/Logo";
import { MoveUpRight } from "lucide-react";
import { Link, NavLink } from "react-router";

const MobileNavModal = forwardRef(function MobileNavModal({ close }, ref) {
  return (
    <div
      ref={ref}
      className="fixed h-screen w-1/2 top-0 left-0 bg-primary flex flex-col items-center gap-4 py-10 text-white -translate-x-full"
    >
      <div className="py-2 px-1 border-white border-2 rounded-sm">
        <Logo />
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {[
          { name: "Home", page: "/" },
          { name: "Projects", page: "projects" },
          { name: "About", page: "about" },
        ].map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.page}
              onClick={close}
              end
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive ? "font-bold border-b pb-0.5 " : "hover:text-red-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link to="contact" className="flex gap-1 items-center mt-auto">
        <p className="border-b border-white pb-0.2">Contact</p>
        <MoveUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
});

export default MobileNavModal;
