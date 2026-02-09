// app/sections/AboutUsContent.jsx (PAS de "use client")
import Copy from "../../components/Copy";
import {
  Title,
  Paragraphe1,
  Paragraphe2,
  Paragraphe3,
  Paragraphe4,
} from "./AboutUsAnimation";
export default function AboutUsContent() {
  return (
    <div className="z-10 relative">
      <Copy>
        <Title />
      </Copy>
      <Copy>
        <Paragraphe1 />
      </Copy>
      <Copy>
        <Paragraphe2 />
      </Copy>
      <Copy>
        <Paragraphe3 />
      </Copy>
      <Copy>
        <Paragraphe4 />
      </Copy>
    </div>
  );
}
