'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Image from 'next/image'
import fluidCursor from '../components/FluidSimulation'; // import du composant
const TheWeekndPage = () => {
   
  const containerRef = useRef(null);
  useEffect(() => {
    fluidCursor();
  }, []);
    return (
        <>
  
   
        <section className="relative h-screen w-full  flex items-center justify-center bg-[url('/medias/weekndposter.webp')] bg-cover bg-center">
           
            <div className="relative z-10 h-screen flex items-center justify-center p-8 ">
                <h1 className="text-[200px] font-bold text-white drop-shadow-2xl font-[Druck] ">
                    THE WEEKND
                </h1>
                <img src={"/medias/weekndposter.webp"} className='absolute h-screen'></img>
                <h1 className="text-[200px] font-bold text-transparent drop-shadow-2xl font-[Druck] absolute hover-stroke transition-all duration-700 ease-out" >
                    THE WEEKND
                </h1>
            </div>
<div className="absolute top-8 right-8 z-20 ">
                <img src="/medias/XO.svg" alt="XO Logo" className="h-10 w-auto " />
            </div>        
             <div className='absolute top-0 left-0 z-2'>
      <canvas id='fluid' className='w-screen h-screen' />
    </div>     
     </section>
            <section >
                <h1>The weeknd Page</h1>
            </section>
        
       
       <style>{`
   .hover-stroke {
   
    transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .hover-stroke:hover {
    -webkit-text-stroke: 0.1px white;
    -webkit-text-fill-color: transparent;
  
  }
`}</style>
        </>
        
    );
};

export default TheWeekndPage;