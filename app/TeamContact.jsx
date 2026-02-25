"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";

const ContactContent = dynamic(
  () => import("./sections/contact/ContactContent"),
);
const TeamContent = dynamic(() => import("./sections/team/TeamContent"));
export default function SectionTeamAndContact() {
  const contactRef = useRef(null);
  return (
    <>
      {/* Team */}
      <section
        id="team_section"
        className="h-[150vh] sm:h-screen bg-[#F5F3EF] relative"
      >
        <TeamContent contactRef={contactRef} />
      </section>

      {/* Contact */}
      <ContactContent ref={contactRef} />
    </>
  );
}
