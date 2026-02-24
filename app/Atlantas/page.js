"use client"
import Image from "next/image";
import { venom } from "../fonts"
import {Menu,Heart} from "lucide-react"
import Copy_bloc from "../components/Copy_bloc"
import AnimatedLink from "../components/AnimatedLink"
export default function PageAtlantas(){
    return (
        <>
        <section className="intro bg-[#EFE9E1] h-screen flex flex-col justify-between items-center">
            <div className="flex items-start justify-between w-full">
            <Copy_bloc blockColor="#72383D"><p className="text-[#72383D] ml-5 mt-5">Introducing</p></Copy_bloc>
            <h1 className={`${venom.className} text-[#322D29] text-9xl text-center z-5`}>ATLANTAS</h1>
            <Menu className="text-[#72383D] mr-5 mt-5"/>
            </div>
            <div className="flex justify-center items-center relative w-full h-full">
                <Image src={"/medias/Parfum.webp"} width={700} height={1000} alt="Parfum" className="rounded-lg absolute -top-10 z-3"></Image>
<div className="absolute w-full overflow-hidden">
  <div className="flex whitespace-nowrap animate-[scrollRight_10s_linear_infinite]">
    <span className={`${venom.className} text-8xl text-[#D8B0B4] mx-16`}>
      Introducing the Atlantas XI — A savor for the men
    </span>
    <span className={`${venom.className} text-8xl text-[#D8B0B4] mx-16`}>
      Introducing the Atlantas XI — A savor for the men
    </span>
    <span className={`${venom.className} text-8xl text-[#D8B0B4] mx-16`}>
      Introducing the Atlantas XI — A savor for the men
    </span>
  </div>
</div>                </div>
            <div className="flex items-end justify-between w-full">
                <Copy_bloc blockColor="#72383D"><p className="text-[#72383D] ml-5 mb-2">2026</p></Copy_bloc>
                <Copy_bloc blockColor="#72383D"><p className="text-[#72383D] mr-5 mb-2">Et id et eu in aute ad culpa nulla amet Lorem in velit laborum deserunt.</p></Copy_bloc>
            </div>
            <button className="rounded-3xl bg-[#72383D] py-2 px-8 text-[#EFE9E1] relative top-120 left-1/2 hidden">Butoon </button>
        </section>
        <section className="h-screen bg-[#EFE9E1]">
            <h1 className="product relative left-5 text-5xl">Voici nos produits:</h1>
            <div className="grid2 flex gap-3 p-5 mt-5 ">
            <div className="bg-[#AC9C8D] rounded-2xl w-60 h-60 overflow-hidden relative">
                <div className="h-50 w-50"><Image src={"/medias/parfum1.png"} width={800} height={1000} alt="Parfum1" className="rounded-lg relative z-5"></Image></div>
                <div className="bg-radial from-white to-transparent h-full w-full top-0 absolute"></div>
                <div className="bg-linear-to-b from-transparent to-[#796858] h-full w-full top-0 absolute"></div>
                <div className="flex items-center justify-between relative z-7">
                <h2 className="text-[#D1C7BD] text-2xl ml-3">Hello</h2>
                <Heart className="mr-3  text-red-500"/></div>
            </div>
            <div className="bg-[#AC9C8D] rounded-2xl w-60 h-60 overflow-hidden relative">
                <div className="h-50 w-50"><Image src={"/medias/parfum2.png"} width={700} height={1000} alt="Parfum2" className="rounded-lg relative z-5"></Image></div>
                <div className="bg-radial from-white to-transparent h-full w-full top-0 absolute"></div>
                <div className="bg-linear-to-b from-transparent to-[#796858] h-full w-full top-0 absolute"></div>
                <div className="flex items-center justify-between relative z-7">
                <h2 className="text-[#D1C7BD] text-2xl ml-3">Hello</h2>
                <Heart className="mr-3  text-red-500"/></div>
            </div>
            <div className="bg-[#AC9C8D] rounded-2xl w-60 h-60 overflow-hidden relative">
                <div className="h-50 w-50"><Image src={"/medias/parfum3.png"} width={700} height={1000} alt="Parfum3" className="rounded-lg relative z-5"></Image></div>
                <div className="bg-radial from-white to-transparent h-full w-full top-0 absolute"></div>
                <div className="bg-linear-to-b from-transparent to-[#796858] h-full w-full top-0 absolute"></div>
                <div className="flex items-center justify-between relative z-7">
                <h2 className="text-[#D1C7BD] text-2xl ml-3">Hello</h2>
                <Heart className="mr-3  text-red-500"/></div>
            </div>
            <div className="bg-[#AC9C8D] rounded-2xl w-60 h-60 overflow-hidden relative">
                <div className="h-50 w-50"><Image src={"/medias/parfum1.png"} width={800} height={1000} alt="Parfum1" className="rounded-lg relative z-5"></Image></div>
                <div className="bg-radial from-white to-transparent h-full w-full top-0 absolute"></div>
                <div className="bg-linear-to-b from-transparent to-[#796858] h-full w-full top-0 absolute"></div>
                <div className="flex items-center justify-between relative z-7">
                <h2 className="text-[#D1C7BD] text-2xl ml-3">Hello</h2>
                <Heart className="mr-3  text-red-500"/></div>
            </div>
            <div className="bg-[#AC9C8D] rounded-2xl w-60 h-60 overflow-hidden relative">
                <div className="h-50 w-50"><Image src={"/medias/parfum2.png"} width={700} height={1000} alt="Parfum2" className="rounded-lg relative z-5"></Image></div>
                <div className="bg-radial from-white to-transparent h-full w-full top-0 absolute"></div>
                <div className="bg-linear-to-b from-transparent to-[#796858] h-full w-full top-0 absolute"></div>
                <div className="flex items-center justify-between relative z-7">
                <h2 className="text-[#D1C7BD] text-2xl ml-3">Hello</h2>
                <Heart className="mr-3  text-red-500"/></div>
            </div>
            <div className="bg-[#AC9C8D] rounded-2xl w-60 h-60 overflow-hidden relative">
                <div className="h-50 w-50"><Image src={"/medias/parfum3.png"} width={700} height={1000} alt="Parfum3" className="rounded-lg relative z-5 size-0.8"></Image></div>
                <div className="bg-radial from-white to-transparent h-full w-full top-0 absolute"></div>
                <div className="bg-linear-to-b from-transparent to-[#796858] h-full w-full top-0 absolute"></div>
                <div className="flex items-center justify-between relative z-7">
                <h2 className="text-[#D1C7BD] text-2xl ml-3">Hello</h2>
                <Heart className="mr-3  text-red-500"/></div>
            </div>
            </div>
            <div className="flex justify-center items-center w-full"><h2 className="text-[#72383D] text-2xl">Consequat elit duis sit aliqua amet minim mollit exercitation ea.</h2></div>
            
        </section>
        <section className="h-screen bg-[#EFE9E1] flex justify-center items-center overflow-hidden">
            <div className="h-screen w-1/3 relative"><Image src={"/medias/Man.webp"} width={700} height={700} alt="Man"   ></Image><h2 className="-rotate-90 text-white absolute text-3xl z-4 top-20">Man</h2></div>
            <div className="h-screen w-1/3 relative"><Image src={"/medias/Woman.webp"} width={700} height={700} alt="Woman" ></Image><h2 className="-rotate-90 text-white absolute text-3xl z-4 top-20">Woman</h2></div>
            <div className="h-screen w-1/3 relative"><Image src={"/medias/Teenager.webp"} width={900} height={1000} alt="Teenager" ></Image><h2 className="-rotate-90 text-white absolute text-3xl z-4 top-20">Teenager</h2></div>
            
        </section>
        <section className="h-screen bg-[#EFE9E1]">
  <h1 className="product relative left-5 text-5xl">Notre histoire:</h1>
<div className="flex justify-center items-center w-full mt-20"><Copy_bloc blockColor="#72383D">
    <h2 className="p-5 leading-relaxed text-[#322D29] text-xl">
      Né d’une recherche d’élégance et de caractère, Atlantas XI incarne
      une vision moderne du parfum de luxe. Plus qu’une fragrance,
      il s’agit d’une signature olfactive pensée pour révéler la présence,
      l’identité et la subtilité de celui qui le porte.
      <br /><br />
      Inspiré par l’équilibre entre puissance et finesse, chaque note a été
      soigneusement imaginée pour créer une expérience sensorielle profonde,
      où la chaleur des accords boisés rencontre la délicatesse des nuances
      aromatiques. Le parfum ne suit pas une tendance, il raconte une histoire,
      celle d’une élégance intemporelle.
      <br /><br />
      Conçu comme une œuvre sensorielle, Atlantas XI s’adresse aux esprits
      exigeants, à ceux qui recherchent bien plus qu’un parfum : une aura,
      une identité, une trace mémorable. Car le véritable luxe ne se voit
      pas seulement, il se ressent.
    </h2>
  </Copy_bloc></div>
  
</section>
        
        <section className="footer overflow-hidden h-screen bg-[#EFE9E1] flex relative justify-center items-center">
            <div className="flex justify-between items-center w-full">
            <div className="w-full ml-5">
                <h2 className="font-bold">Pages</h2>
                <ul>
                    <li>Home</li>
                    <li>Parfum</li>
                    <li>Shop</li>
                    <li>Product</li>
                </ul>
            </div>
            <div className="w-full ml-5">
                <h2 className="font-bold">Réseaux sociaux</h2>
                <ul>
                    <li><AnimatedLink color="black" href="#">Instagram</AnimatedLink></li>
                    <li><AnimatedLink color="black" href="#">Twitter</AnimatedLink></li>
                    <li><AnimatedLink color="black" href="#">TikTok</AnimatedLink></li>
                    <li><AnimatedLink color="black" href="#">Facebook</AnimatedLink></li>
                </ul>
            </div>
            <div className="mr-5">
                <h2 className="font-bold">Use</h2>
                <ul>
                    <li><p className="text-nowrap">© 2026 Atlantas XI. All rights reserved</p></li>
                    <li><p className="text-nowrap">Terms & Privacy Policy</p></li>
                    
                </ul>
            </div>
            </div>
            <h1 className={`${venom.className} text-[#322D29] text-9xl text-center z-5 absolute -bottom-10`}>ATLANTAS</h1>

        </section>
           <style jsx>{`
        @keyframes scrollRight {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
      `}</style>
        </>
        
    )

}