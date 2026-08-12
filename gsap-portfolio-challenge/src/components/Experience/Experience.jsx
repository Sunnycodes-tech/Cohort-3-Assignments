// 

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Experience.scss";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    date: "OCT 2024 – JUNE 2027",
    title: "BCA — Bachelor of Computer Applications",
    org: "Manipal University Jaipur, India",
    desc:
      "Pursuing an Online BCA with a focus on software development, computer science fundamentals, problem solving, and modern web technologies..",
  },
  {
    date: "MAY 2026 – FEBRUARY 2027",
    title: "Full-Stack Web Development,Learning",
    org: "Sheryians Coding School — Cohort 3.0, India",
    desc:
      "Built full-stack features (React.js + Node.js + MongoDB) for an internal social network, including an automated birthday scheduler that boosted daily engagement by 40%.",
  },
  {
    date: "JULY 2026 – MARCH 2027",
    title: "Java & DSA",
    org: "Sheryians Coding School — Cohort 3.0, India",
    desc:
      "Building a strong foundation in Java, data structures, algorithms, and problem solving as part of my preparation for software engineering roles.",
  },
  {
    date: "AUGUST 2026 – APRIL 2027",
    title: "GenAI & DevOps and System Design",
    org: "Sheryians Coding School — Cohort 3.0, India",
    desc:
      "Exploring Generative AI, DevOps, and System Design while building practical projects and developing a deeper understanding of modern software architecture, deployment workflows, and scalable applications.",
  },
  {
    date: "AUGUST 2026 – APRIL 2027",
    title: "Building & Exploring – Personal Projects",
    org: "Independent Development",
    desc:
      "Building practical projects to turn ideas into real-world applications while experimenting with modern technologies, improving development skills, and learning through hands-on implementation.",
  },
];

/**
 * @author SunnyKumar Singh
 * @returns Experience component that renders a vertical timeline of professional milestones. Each timeline item animates into view as the user scrolls, with a line that fills up to indicate progress through the timeline. The component uses GSAP for scroll-triggered animations, creating an engaging way to showcase career highlights and achievements.
 */
export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const lineFillRef = useRef(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      const wrap = timelineRef.current;
      const items = gsap.utils.toArray(".tl-item", wrap);

      // Initial states
      items.forEach((item) => {
        const card = item.querySelector(".tl-card");
        const dot = item.querySelector(".tl-dot");

        gsap.set(card, { opacity: 0.18, y: 60, filter: "blur(10px)" });
        gsap.set(dot, { scale: 0.9, opacity: 0.55 });
      });

      // Line fill (grows as you scroll through the timeline)
      gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.to(lineFillRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // Activate item when it hits center-ish
      items.forEach((item) => {
        const card = item.querySelector(".tl-card");
        const dot = item.querySelector(".tl-dot");

        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.9,
                ease: "power3.out",
              });
              gsap.to(dot, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "power3.out",
              });
              item.classList.add("is-active");
            } else {
              gsap.to(card, {
                opacity: 0.18,
                y: 60,
                filter: "blur(10px)",
                duration: 0.7,
                ease: "power3.out",
              });
              gsap.to(dot, {
                scale: 0.9,
                opacity: 0.55,
                duration: 0.35,
                ease: "power3.out",
              });
              item.classList.remove("is-active");
            }
          },
        });
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section className="journey" ref={sectionRef} id="timeline">
      {/* Hero heading like your video */}
      <div className="journey-hero">
        <p className="journey-kicker">02. JOURNEY</p>
        <h2 className="journey-title">Learning & Building</h2>
        <p className="journey-sub">
          A timeline of my learning journey—from building strong foundations in
          computer science to exploring modern technologies and turning ideas into
          real-world projects.
        </p>
      </div>

      {/* Timeline */}
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-line">
          <span className="timeline-line-bg" />
          <span className="timeline-line-fill" ref={lineFillRef} />
        </div>

        {TIMELINE.map((t, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div className={`tl-item ${side}`} key={`${t.date}-${i}`}>
              <div className="tl-side tl-left">
                {side === "left" ? (
                  <article className="tl-card">
                    <div className="tl-date">{t.date}</div>
                    <h3 className="tl-h">{t.title}</h3>
                    <div className="tl-org">{t.org}</div>
                    <p className="tl-desc">{t.desc}</p>
                  </article>
                ) : null}
              </div>

              <div className="tl-center">
                <span className="tl-dot" aria-hidden="true" />
              </div>

              <div className="tl-side tl-right">
                {side === "right" ? (
                  <article className="tl-card">
                    <div className="tl-date">{t.date}</div>
                    <h3 className="tl-h">{t.title}</h3>
                    <div className="tl-org">{t.org}</div>
                    <p className="tl-desc">{t.desc}</p>
                  </article>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
