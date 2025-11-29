import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  /* ----- INPUT VALIDATION -----*/
  // const nameValidation = formData.name.length < 5 ? "" : ""

  const submitFormHandler = (e) => {
    e.preventDefault();

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className="p-5 flex flex-col">
      <h1 className="uppercase text-4xl">Send Me A Message</h1>

      {/* FORM */}
      <form
        action="POST"
        onSubmit={submitFormHandler}
        className="flex flex-col gap-6 mt-10"
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
            required
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
            required
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
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button className="py-2 px-10 uppercase bg-primary/90 text-tertiary text-sm rounded-sm self-start">
          Send
        </button>
      </form>

      {/* FACE */}
      <div className="flex gap-15 items-center justify-center w-full mt-5">
        <div className="relative h-25 w-25 rounded-full border border-primary shadow-[2px_3px_5px_rgb(34,34,34,.7)]">
          {/* EYES */}
          <div className="absolute flex gap-3 top-4 left-[50%] -translate-x-[55%]">
            {/* LEFT EYE */}
            <div
              className={`h-7 w-6.5 transition-all duration-500 border rounded-full ${
                awake ? "border-primary" : "border-tertiary"
              }  relative overflow-hidden`}
            >
              <div
                className={`h-full w-full border-b-2 rounded-b-full bg-tertiary absolute transition-all duration-1000 ${
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
              className={`h-7 w-6.5 transition-all duration-500 border rounded-full ${
                awake ? "border-primary" : "border-tertiary"
              }  relative overflow-hidden`}
            >
              <div
                className={`h-full w-full border-b-2 rounded-b-full bg-tertiary absolute transition-all duration-1000 ${
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
              className={`transition-all duration-500 border w-5 ${
                awake ? "h-0.5 rounded-sm" : "h-5 rounded-full"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
