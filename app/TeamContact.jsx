"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";

const ContactContent = dynamic(
  () => import("./sections/contact/ContactContent"),
);
const Team = dynamic(() => import("./sections/team/TeamContent"));
export default function SectionTeamAndContact() {
  const contactRef = useRef(null);
  return (
    <>
     <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "fixed", width: 0, height: 0 }}>
  <defs>
    <filter id="SquiCircleFilter">  {/* ← même ID */}
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
        result="goo"
      />
      <feBlend in="SourceGraphic" in2="goo" />
    </filter>
  </defs>
</svg>
      {/* Team */}
      <section
        id="team_section"
        className="h-[150vh] lg:h-screen bg-[#F5F3EF] relative"
      >
        <Team contactRef={contactRef} />
      </section>

      {/* Contact */}
      <ContactContent ref={contactRef} />
    </>
  );
}
