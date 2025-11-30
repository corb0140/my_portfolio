import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isAngry, setIsAngry] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* ----- INPUT VALIDATION -----*/
  const isValid =
    formData.name.trim().length > 2 &&
    formData.email.includes("@") &&
    formData.message.trim().length > 4;

  /* ----- FACE ANIMATION TRIGGERS & STATE -----*/
  const awake =
    formData.name.length > 0 ||
    formData.email.length > 0 ||
    formData.message.length > 0;

  const mouthSleepRef = useRef(null);

  useEffect(() => {
    const mouth = mouthSleepRef.current;

    if (!mouth) return;

    if (!awake) {
      const tl = gsap.to(mouth, {
        scale: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });

      return () => {
        tl.kill();
        gsap.set(mouth, { scale: 1 });
      };
    } else {
      gsap.killTweensOf(mouth);
      gsap.set(mouth, { scale: 1 });
    }
  }, [awake]);

  const handleFaceChange = () => {
    if (!awake) return;

    setIsAngry(true);

    const timeout = setTimeout(() => {
      setIsAngry(false);
    }, 3000);

    return () => clearTimeout(timeout);
  };

  /* ----- SUBMIT -----*/
  const submitFormHandler = (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        alert("Message sent!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Email JS error:", error);
        alert("Failed to send message.");
      });
  };

  return (
    <div className="p-5 flex flex-col">
      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal">
          Let's build something great together
        </p>
        <h1 className="uppercase text-4xl">Send Me A Message</h1>
      </div>

      {/* FORM */}
      <form
        action="POST"
        onSubmit={submitFormHandler}
        className="flex flex-col gap-6 mt-8"
      >
        <div className="relative">
          <label
            htmlFor="name"
            className="absolute bg-tertiary text-sm -top-2.5 left-2 px-1"
          >
            Name
          </label>

          <input
            type="text"
            name="name"
            id="name"
            className="h-12 rounded-sm w-full border pl-2"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="relative">
          <label
            htmlFor="name"
            className="absolute bg-tertiary text-sm -top-2.5 left-2 px-1"
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            className="h-12 rounded-sm w-full border pl-2"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="relative">
          <label
            htmlFor="name"
            className="absolute bg-tertiary text-sm -top-2.5 left-2 px-1"
          >
            Message
          </label>

          <textarea
            name="message"
            id="message"
            className="h-40 rounded-sm w-full border p-1.5"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button
          disabled={!isValid || isLoading}
          className={`py-2 px-10 uppercase transition duration-200 ${
            !isValid ? "bg-primary/20" : "bg-primary/90"
          } text-tertiary text-sm rounded-sm self-start`}
        >
          {isLoading ? (
            <>
              <span className="loader"></span>
              Sending...
            </>
          ) : (
            "Send"
          )}
        </button>
      </form>

      {/* FACE */}
      <div onClick={handleFaceChange} className="w-fit mt-5 self-center">
        <div className="relative h-25 w-25 rounded-full border border-primary shadow-[2px_3px_5px_rgb(34,34,34,.7)]">
          {/* ANGRY ICON */}
          <div
            className={`absolute -top-1 right-1 grid grid-cols-2 gap-0.5 -rotate-10 h-6 w-6 ${
              isAngry ? "animate-beat" : "scale-0 opacity-0"
            }`}
          >
            <div className="border-b-3 border-r-3 rounded-br-md"></div>
            <div className="border-b-3 border-l-3 rounded-bl-md"></div>
            <div className="border-t-3 border-r-3 rounded-tr-md"></div>
            <div className="border-t-3 border-l-3 rounded-tl-md"></div>
          </div>

          {/* EYES */}
          <div
            className={`absolute flex items-center justify-center gap-3 top-4.5 left-[50%] -translate-x-[55%] h-7`}
          >
            {/* LEFT EYE */}
            <div
              className={` transition-all duration-500 border rounded-full ${
                awake ? "border-primary" : "border-tertiary"
              } ${
                isAngry ? "h-0.5 w-5" : "h-7 w-6.5"
              } relative overflow-hidden`}
            >
              <div
                className={`h-full w-full border-b-2 rounded-b-full bg-tertiary absolute transition-all duration-300 ${
                  awake ? "-top-10" : "top-0"
                } z-10`}
              ></div>

              <div
                className={`absolute top-0 bg-primary h-5 ${
                  awake ? "w-full" : "w-0"
                } rounded-b-full`}
              ></div>
            </div>

            {/* RIGHT EYE */}
            <div
              className={`transition-all duration-500 border rounded-full ${
                awake ? "border-primary" : "border-tertiary"
              } ${
                isAngry ? "h-0.5 w-5" : "h-7 w-6.5"
              } relative overflow-hidden`}
            >
              <div
                className={`h-full w-full border-b-2 rounded-b-full bg-tertiary absolute transition-all duration-300 ${
                  awake ? "-top-10" : "top-0"
                } z-10`}
              ></div>

              <div
                className={`absolute top-0 bg-primary h-5 ${
                  awake ? "w-full" : "w-0"
                } rounded-b-full`}
              ></div>
            </div>
          </div>

          {/* MOUTH */}
          <div
            ref={mouthSleepRef}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-10 h-5 flex items-center justify-center"
          >
            <div
              className={`border-r-2 rounded-r-md transition-all duration-300 ${
                isAngry ? "h-3 w-2" : "h-0 w-0"
              }`}
            ></div>

            <div
              className={`transition-all duration-500 border w-4 ${
                awake ? "h-0.5 rounded-sm" : "h-4 rounded-full"
              }`}
            ></div>

            <div
              className={`border-l-2 rounded-l-md transition-all duration-300 ${
                isAngry ? "h-3 w-2" : "h-0 w-0"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* MESSAGE */}
      {isAngry && (
        <span className="w-full text-center mt-1 text-sm font-bold">
          Hey! Don't touch me.
        </span>
      )}
    </div>
  );
}

export default ContactPage;
