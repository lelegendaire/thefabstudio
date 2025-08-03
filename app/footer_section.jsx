"use client"
import "./style_footer.css"
import {ArrowRight} from "lucide-react"
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Switch  } from "./components/ui/switch"
import Copy from "./components/Copy"

export function DepthImage({ src, alt }) {
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Position relative 0 -> 1
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    // On crée un petit décalage (+/- 10%)
    const offset = 10; 
    const x = 50 + (relX - 0.5) * offset * 2;
    const y = 50 + (relY - 0.5) * offset * 2;

    setBgPos({ x, y });
  };

  return (
    <motion.div
      className="image_footer relative ml-2 mt-2 w-110 h-100 rounded-2xl overflow-hidden"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setBgPos({ x: 50, y: 50 })}
      animate={{
        scale: 1.05, // léger zoom pour accentuer la profondeur
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <span className="sr-only">{alt}</span>
    </motion.div>
  );
}
export function AnimatedLink({ href, children, color }) {
  return (
    <motion.a
      href={href}
      className="relative inline-block text-nowrap"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {children}
      <motion.span
        className="absolute left-0 bottom-0 h-[2px]"
        style={{ backgroundColor: color }}
        variants={{
          rest: { width: 0 },
          hover: { width: "100%", transition: { duration: 0.3, ease: "easeOut" } }
        }}
      />
    </motion.a>
  );
}
export default function Footer(){
    return (
        <section id="project_section" className="h-[120vh] bg-white pr-4 pl-4 pt-4 relative font-[Satoshi] font-bold">
            <div className="flex justify-between items-center"><h1 className=" w-1/2 font-[Dirtyline] font-bold text-8xl text-black">The <br></br>Fab <br></br>Studi</h1><h1 className="font-[PlayfairDisplay] font-normal text-8xl italic absolute top-50 left-63">O</h1>
            <div className="droite  w-1/2">
                <Copy><h1 className="text-6xl mb-8">We are a french studio who developp a site web for you</h1></Copy>
                <a href="mailto:thefabstudio2@gmail.com" className="underline text-3xl">thefabstudio2@gmail.com</a>
            </div>
            </div> <div className="flex items-center justify-between w-screen gap-[1rem] text-black text-[20px] h-[20px]">
                   
                     <motion.div
          className="star h-[20px] w-[20px] relative mt-auto"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
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
                fill="#000"
              />
            </g>
          </svg>
        </motion.div><div className="line h-[3px] w-full bg-black rounded-4xl"></div><div className="date mr-[50px]"><p className="font-[Dirtyline] text-[20px]">2025</p></div></div>
            <div className="flex justify-between items-start mt-5">
                <div className="flex flex-col">
                <div className="flex justify-between items-start">
                <div className="social w-1/4 list-none">
                    <h1 className="text-gray-400">Social</h1>
                    <li className="mt-3 text-2xl"><AnimatedLink color="black" href="instagram.com">Instagram</AnimatedLink></li> </div>
                <div className="page w-1/4 list-none">
                    <h1 className="text-gray-400">Page</h1>
                    <li className="mt-3 text-2xl"><AnimatedLink color="black" href="#home_section">Home</AnimatedLink></li>
                    <li className="text-2xl"><AnimatedLink color="black" href="#about_section">About us</AnimatedLink></li>
                    <li className="text-2xl"><AnimatedLink color="black" href="#projects_section">Projects</AnimatedLink></li>
                    <li className="text-2xl"><AnimatedLink color="black" href="#team_section">Team</AnimatedLink></li>
                    <li className="text-2xl"><AnimatedLink color="black" href="#contact_section">Contact</AnimatedLink></li>
               </div></div>
               <div className="flex items-end justify-start gap-3  h-50">
                <p>Fr</p>
                     <Switch/>
                <p>En</p>
      

               </div>
               </div>
                <div className="flex items-start justify-start relative flex-col w-1/2">
                <DepthImage src={"https://images.unsplash.com/photo-1744740620138-e4b143ef29f9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
                <div className="absolute"><h3 className="text-gray-400">Need help ?</h3>
                <button className="flex items-center justify-center gap-1  w-auto bg-black text-white rounded-3xl p-3 mt-3">Take contact<ArrowRight /></button>
                </div></div>
                
            </div>
            <div className="flex items-center relative mt-5 pb-3 justify-between w-full text-gray-400">
                <h1>&copy; 2025 TheFabStudio. All right reserved </h1>
                <h1 ><AnimatedLink color="grey" href="/privacy-policy">Terms & Privacy Policy</AnimatedLink></h1>
            </div>
        </section>
    )
}