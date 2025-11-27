import { useRef, useState } from "react";
import Logo from "./UI/Logo";
import gsap from "gsap";
import MobileNavModal from "./MobileNavModal";

function Header() {
  const hamburgerMenu =
    "h-[3px] w-full bg-primary rounded-[5px] absolute left-0 top-0";

  const [isOpen, setIsOpen] = useState(false);

  const bar1Ref = useRef(null);
  const bar2Ref = useRef(null);
  const bar3Ref = useRef(null);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  const openMenu = () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(modalRef.current, { x: 0, duration: 0.8 })
      .to(bar1Ref.current, { y: "6px", rotate: 45, duration: 0.6 }, "<0")
      .to(bar2Ref.current, { opacity: 0 }, "<")
      .to(bar3Ref.current, { y: "-6px", rotate: -45, duration: 0.6 }, "<")
      .to(buttonRef.current, { rotate: 360, duration: 1.2 }, "<-0.09");

    setIsOpen(true);
  };

  const closeMenu = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => setIsOpen(false),
    });

    tl.to(modalRef.current, {
      x: "-100%",
      duration: 0.8,
    })
      .to(buttonRef.current, { rotate: 0, duration: 1.2 }, "<")
      .to(bar1Ref.current, { y: 0, rotate: 0, duration: 0.6 }, "<")
      .to(bar2Ref.current, { opacity: 1 }, "<")
      .to(bar3Ref.current, { y: 0, rotate: 0, duration: 0.6 }, "<");
  };

  return (
    <>
      <header className="p-4 flex justify-between items-center relative">
        <Logo />

        <button
          ref={buttonRef}
          className="relative flex items-center h-4 w-5"
          onClick={() => (isOpen ? closeMenu() : openMenu())}
        >
          <span ref={bar1Ref} className={`${hamburgerMenu}`}></span>
          <span ref={bar2Ref} className={`${hamburgerMenu} top-1.5`}></span>
          <span ref={bar3Ref} className={`${hamburgerMenu} top-3`}></span>
        </button>
      </header>

      <MobileNavModal ref={modalRef} close={() => closeMenu()} />
    </>
  );
}

export default Header;
