"use client";
import { HyperText } from "../components/magicui/hyper-text";
import CubeOverlay from "./cube";
import Header from "./header";
import { dirtyline } from "./fonts";
export default function Hero({ isLoaded }) {
  return (
    <>
      <CubeOverlay isLoaded />
      <h1 className="absolute -z-999 text-white">TheFabStudio</h1>
      <section className="hero text-[180px] h-screen flex items-center justify-center z-10 pointer-events-none">
        <div className="btn_home absolute top-0 right-0 p-5 pointer-events-auto">
          <Header />
        </div>

        <div className="footer_hero absolute bottom-px flex items-center justify-between w-screen gap-4 text-white text-[20px] h-5 z-8">
          <div className="star ml-2.5 sm:ml-12.5 h-5 w-5 relative mt-auto">
            <svg
              version="1.1"
              id="sparkle_x5F_stars"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
            >
              <g id="row1">
                <path
                  id="icon:5"
                  d="m128 62.6-38.3 6.6c-9.9 1.7-17.6 9.6-18.9 19.6L65.4 128l-6.6-38.3c-1.7-9.9-9.6-17.6-19.6-18.9L0 65.4l38.3-6.6c9.9-1.7 17.6-9.6 18.9-19.6L62.6 0l6.6 38.3c1.7 9.9 9.6 17.6 19.6 18.9l39.2 5.4z"
                  fill="#fff"
                />
              </g>
            </svg>
          </div>
          <div className="line h-0.75 w-full bg-white rounded-4xl"></div>
          <div className={`${dirtyline.className} date mr-2.5 sm:mr-12.5`}>
            <HyperText className="text-[20px]">2026</HyperText>
          </div>
        </div>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Go to main content
        </a>
      </section>
    </>
  );
}
