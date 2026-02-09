// app/sections/footer/FooterContent.jsx (PAS de "use client")
import Copy from "../../components/Copy";
import { dirtyline } from "../../fonts";
import { Switch } from "../../components/ui/switch";
import { ArrowRight } from "lucide-react";
import {
  DepthImage,
  AnimatedLink,
  AnimatedStar,
  MailLink,
  LanguageSwitch,
  Description,
  Home,
  About,
  Projects,
  Team,
  NeedHelp,
  Rights,
  Privacy,
  Social,
} from "./FooterAnimations";

export default function FooterContent() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2
          className={`${dirtyline.className} w-1/2 font-bold sm:text-8xl text-3xl text-black`}
        >
          The <br />
          Fab <br />
          Studi
        </h2>
        <h2 className="font-[PlayfairDisplay] font-normal sm:text-8xl text-3xl italic absolute sm:top-50 sm:left-62 top-21.5 left-22.5">
          O
        </h2>

        <div className="droite w-1/2 flex flex-col">
          <Copy>
            <Description />
          </Copy>
          <MailLink />
        </div>
      </div>

      {/* Ligne décorative */}
      <div className="flex items-center justify-between gap-4 text-black text-[20px] h-5 w-full mt-8">
        <div className="star h-5 w-5 relative mt-auto">
          <AnimatedStar />
        </div>
        <div className="line h-0.75 w-full bg-black rounded-4xl" />
        <div className="date sm:mr-12.5 mr-10">
          <p className={`${dirtyline.className} text-[20px]`}>2026</p>
        </div>
      </div>

      {/* Navigation et infos */}
      <div className="flex justify-between items-start mt-5 h-[40vh] sm:h-[70vh]">
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            {/* Social */}
            <div className="social w-1/4 list-none">
              <Social />
              <ul>
                <li className="mt-3 sm:text-2xl text-xs">
                  <AnimatedLink
                    color="black"
                    target_on="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/thefabstudio2/"
                  >
                    Instagram
                  </AnimatedLink>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <nav className="page w-1/4 list-none">
              <h3 className={`${dirtyline.className} text-black text-2xl`}>
                Page
              </h3>
              <ul>
                <li className="mt-3 sm:text-2xl text-xs">
                  <Home />{" "}
                </li>
                <li className="sm:text-2xl text-xs">
                  <About />{" "}
                </li>
                <li className="sm:text-2xl text-xs">
                  <Projects />{" "}
                </li>
                <li className="sm:text-2xl text-xs">
                  <Team />{" "}
                </li>
                <li className="sm:text-2xl text-xs">
                  <AnimatedLink color="black" href="#contact_section">
                    Contact
                  </AnimatedLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Language switcher placeholder */}
          <div className="flex items-end justify-start sm:h-50 h-40">
            <div className="flex items-center justify-center gap-3">
              <LanguageSwitch />
            </div>
          </div>
        </div>

        {/* Image et CTA */}
        <div className="flex items-start justify-start flex-col w-1/2 sm:relative absolute sm:left-0 left-50">
          <div className="relative sm:mt-2 sm:w-110 w-50 sm:h-100 h-50 rounded-2xl overflow-hidden">
            <DepthImage src={"/medias/Dune_footer.webp"} alt="Dune parallax" />
          </div>

          <div className="absolute">
            <NeedHelp />
            <a
              href="#contact_section"
              className="flex items-center justify-center gap-1 w-31 bg-black text-white rounded-2xl sm:p-3 sm:mt-3 p-1 mt-1 sm:text-base text-xs"
            >
              Contact
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex items-center relative mt-5 pb-3 justify-between w-full text-black sm:text-base text-xs">
        <Rights />
        <p>
          <Privacy />
        </p>
      </div>
    </>
  );
}
