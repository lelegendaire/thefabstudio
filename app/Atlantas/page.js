"use client"
import "./style.css"
import { useEffect, useState } from 'react'
import {House, ShoppingBag, Gem} from "lucide-react"
export default function Projects_1(){
   
    
 
    const [dimensions, setDimensions] = useState({ width: 1410, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      const padding = 20; // 10px de chaque côté
      setDimensions({
        width: window.innerWidth - padding,
        height: window.innerHeight - padding
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const generatePath = (w, h) => {
    const centerX = w / 2;
    const cornerRadius = 20;
    const offset = 10;
    
   // Dimensions fixes de l'encoche (basées sur votre path original)
    const notchWidth = 305; // Distance de 645 à 850 dans l'original
    const notchHeight = 45; // Hauteur de l'encoche (ajustable)
    const notchStart = centerX - notchWidth / 2;
    const notchEnd = centerX + notchWidth / 2;
    
    // Proportions relatives pour les courbes (en pourcentage de la hauteur)
  const curve1Y = notchHeight * 0.14; // ~12 sur 85
  const curve2Y = notchHeight * 0.35; // ~30 sur 85
  const curve3Y = notchHeight * 0.59; // ~50 sur 85
  const curve4Y = notchHeight * 0.82; // ~70 sur 85
  const curve5Y = notchHeight * 0.94; // ~80 sur 85
  const bottomY = notchHeight;
  
  return `
    M ${cornerRadius + offset},${offset + 10} 
    L ${notchStart},${offset + 10} 
    Q ${notchStart + 12},${offset + 10} ${notchStart + 18},${offset + 10 + curve1Y} 
    Q ${notchStart + 25},${offset + 10 + curve2Y} ${notchStart + 35},${offset + 10 + curve3Y} 
    Q ${notchStart + 45},${offset + 10 + curve4Y} ${notchStart + 60},${offset + 10 + curve5Y} 
    Q ${notchStart + 70},${offset + 10 + bottomY} ${notchStart + 85},${offset + 10 + bottomY} 
    L ${notchEnd - 85},${offset + 10 + bottomY} 
    Q ${notchEnd - 70},${offset + 10 + bottomY} ${notchEnd - 60},${offset + 10 + curve5Y} 
    Q ${notchEnd - 45},${offset + 10 + curve4Y} ${notchEnd - 35},${offset + 10 + curve3Y} 
    Q ${notchEnd - 25},${offset + 10 + curve2Y} ${notchEnd - 18},${offset + 10 + curve1Y} 
    Q ${notchEnd - 12},${offset + 10} ${notchEnd},${offset + 10} 
    L ${w - cornerRadius - offset},${offset + 10} 
    A ${cornerRadius},${cornerRadius} 0,0,1 ${w - offset},${offset + cornerRadius + 10} 
    L ${w - offset},${h - cornerRadius - offset} 
    A ${cornerRadius},${cornerRadius} 0,0,1 ${w - cornerRadius - offset},${h - offset} 
    L ${cornerRadius + offset},${h - offset} 
    A ${cornerRadius},${cornerRadius} 0,0,1 ${offset},${h - cornerRadius - offset} 
    L ${offset},${offset + cornerRadius + 10} 
    A ${cornerRadius},${cornerRadius} 0,0,1 ${cornerRadius + offset},${offset + 10} 
    Z
  `.replace(/\s+/g, ' ').trim();
  };

  const pathData = generatePath(dimensions.width, dimensions.height);
    return (
        <section className="h-full w-full bg-black flex items-center justify-center flex-col">
            
            
        <div className='hero h-screen w-screen overflow-hidden bg-black flex items-center justify-center' style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          clipPath: `path("${pathData}")`,
          margin: '5px'
        }}><img src="/medias/Parfum.jpg" ></img>
          
         
        </div>
        <div className="interior absolute z-50 h-screen w-screen flex items-center justify-center top-[0%]">
            <div className="Menu_bar z-50 flex items-center justify-center gap-5 relative top-[-43%]">   
              <Gem color="#ffffff" size={20}/>
              <House color="#ffffff" />
              <ShoppingBag color="#ffffff" size={20}/>
              </div>
              <div className="flex items-center justify-center "><h1>ATLANTAS</h1></div>
         
            </div>
        <div className="products h-screen w-full">
            <h1 className="text-white">hello</h1>
        </div>
        </section>
    )
}