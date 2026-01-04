"use client"

import { useRef, useEffect, useState } from 'react';
import Loader from './loader/loader'; // Ton composant Loader
import Hero from './hero'; // Ton composant Loader
import About_us from './about_us_section';
import Projects from './projects';
import Footer from './footer_section';
import Contact from './contact_section';
import Team from './team_section';
import Interaction from './interaction';
export default function Home() {
   const contactRef = useRef(null);
   const [showLoader, setShowLoader] = useState(true)
  return (
    
    <>
    <Loader>
      <Hero></Hero>
      </Loader>
     
    

    <About_us/>
    <Projects/>
    
  <Team contactRef={contactRef} />

      <Contact ref={contactRef} />
    <Interaction/>
    <Footer/>
    </>
  );
}
