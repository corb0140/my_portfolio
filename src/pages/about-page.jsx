import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

function AboutPage() {
  const [data, setData] = useState([]);

  const backgroundRef = useRef(null);
  const frontendRef = useRef(null);
  const interestsRef = useRef(null);
  const technologiesRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 2, ease: "power1.In" },
    });

    tl.to(backgroundRef.current, {
      opacity: 1,
      delay: 0.3,
    })
      .to(
        interestsRef.current,
        {
          opacity: 1,
        },
        "<0.5"
      )
      .to(
        frontendRef.current,
        {
          opacity: 1,
        },
        "<0.5"
      )
      .to(
        technologiesRef.current,
        {
          opacity: 1,
        },
        "<0.5"
      );
  }, []);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const res = await fetch("/src/data/technologies.json");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.log("Error fetching data" + err);
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <div className="p-8 ">
      <h1 className="uppercase font-bold text-4xl md:text-5xl max-w-50 md:max-w-80">
        Get to know me
      </h1>

      <div className="mt-10 flex flex-col gap-5 md:gap-8 h-auto w-full">
        <span ref={backgroundRef} className="opacity-0">
          <h2 className="uppercase text-lg md:text-2xl tracking-wide">
            Background
          </h2>
          <span className="text-sm md:text-xl mt-2 flex flex-col gap-2 md:max-w-180 tracking-wide leading-5 md:leading-8">
            <p>
              I'm originally from Barbados, where I built a strong foundation in
              customer service and operations. I started my career in guest
              facing roles, and through hard work and dedication, I was promoted
              to Operations Assistant, an experience that strengthened my
              leadership, communication, and problem-solving skills.
            </p>

            <p>
              Although I enjoyed my work, I discovered a growing passion for
              technology after watching YouTubers like Kevin Powell, Tom Is
              Loading, and Web Dev Simplified. Their content opened my eyes to
              the world of web development and inspired me to pursue a new
              direction.
            </p>

            <p>
              Driven by curiosity and a desire to challenge myself, I made the
              decision to move to Canada to study web development and build a
              future in tech. Since then, I've been committed to learning modern
              web technologies and improving my skills.
            </p>
          </span>
        </span>

        <span ref={interestsRef} className="opacity-0">
          <h2 className="uppercase text-lg md:text-2xl tracking-wide">
            A bit more about me
          </h2>
          <span className="text-sm md:text-xl mt-2 flex flex-col gap-2 md:max-w-180 tracking-wide leading-5 md:leading-8">
            <p>
              I consider myself a social introvert, someone who genuinely enjoys
              connecting with people but also needs time alone to recharge and
              stay grounded. I value meaningful conversations over small talk,
              and I'm most energized when I'm around people who share similar
              passions.
            </p>

            <p>
              I'm also a proud weeb and long-time anime fan. Anime has always
              resonated with me because of its storytelling, creativity, and
              emotional depth. Whether it's classic shonen, slice-of-life, or a
              hilarious comedic series, I enjoy the way anime blends art and
              narrative to create worlds worth getting lost in.
            </p>

            <p>
              Outside of anime, I'm an avid gamer who enjoys everything from
              competitive titles to narrative driven adventures. Video games and
              board games alike appeal to me because they combine strategy,
              creativity, and social interaction, whether I'm playing solo or
              teaming up with friends.
            </p>

            <p>
              I've also been a devoted FC Barcelona supporter for as long as I
              can remember. The club's style of play, history, and football
              philosophy drew me in early. When at their best I believe there is
              no team more exciting to watch.
            </p>

            <p>
              Music is another big part of my life. I enjoy listening to all
              genres, not because of trends, but because I genuinely appreciate
              the craft behind it. Whether it's hip-hop, country, rock, soca,
              electronic, or classical, I love listening to it all.
            </p>
          </span>
        </span>

        <span ref={frontendRef} className="opacity-0">
          <h2 className="uppercase text-lg md:text-2xl tracking-wide">
            Why Frontend
          </h2>
          <span className="text-sm md:text-xl mt-2 flex flex-col gap-2 md:max-w-180 tracking-wide leading-5 md:leading-8">
            <p>
              I chose frontend development because I love the creative side of
              building on the web. There's something special about taking an
              idea and turning it into a clean, beautiful interface that people
              can actually see and interact with. Crafting layouts, choosing
              colors, shaping the user experience, and bringing designs to life
              feels like a perfect mix of logic and creativity. It's the part of
              development where I get to express myself while still solving real
              problems.
            </p>

            <p>
              A lot of people chase backend or fullstack roles because they're
              more technical or pay more or because they say "frontend is dead",
              but that's never been my mindset. I don't want to choose a path
              just because it's trendy or because someone says it's more
              valuable. I'd rather do the thing I actually enjoy, the thing that
              keeps me curious and motivated. For me, that's building intuitive
              UIs, polishing interactions, and creating experiences that feel
              smooth, modern, and enjoyable.
            </p>

            <p>
              At the end of the day, I believe you should choose what you
              genuinely like doing. When you work on something you enjoy, you
              stay consistent, you grow faster, and you produce better results.
              While I understand some backend principles from college projects,
              frontend is where I feel most at home, and that's why it's the
              path I've committed to.
            </p>
          </span>
        </span>

        <span ref={technologiesRef} className="opacity-0">
          <h2 className="uppercase text-lg md:text-2xl tracking-wide">
            Technologies
          </h2>

          {/* GRID & DRAGGABLE */}
          <div className="mt-3">
            {data.map((item, index) => (
              <span
                key={index}
                className="text-sm md:text-xl mt-2 mx-1 py-1 px-2 md:py-2 md:px-3 inline-block bg-primary/90 text-white rounded-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </span>
      </div>
    </div>
  );
}

export default AboutPage;
