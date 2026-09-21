import { dirtyline } from "../fonts";

export default function Card_compo({title,desc,img}){
    return(
           <div className="card group mt-[50vh] relative w-full h-svh p-[1.5em]">
                    <div className="card-marquee w-full absolute top-1/2 left-0 transform-[translateY(-50%)] overflow-hidden" />
                    <div className="card-wrapper relative w-full h-full will-change-transform">
                      <div className="card-content absolute w-full h-full flex items-end justify-center z-1">
                        <div className="card-title w-full absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] text-center">
                          <h1 className={`${dirtyline.className} text-[5rem] font-medium tracking-[-0.1rem] leading-tight`}>{title}</h1>
                        </div>
                        <div className="card-description text-center w-[40%] mb-[3em] relative transform-[translateX(40px)] opacity-0">
                          <p className="text-[1.125rem] font-normal leading-tight">{desc}</p>
                        </div>
                      </div>
                      <div className="card-img absolute w-full h-full rounded-[150px] overflow-hidden">
                        <img className="image_film relative w-full h-full object-cover group-hover:brightness-50 transition-[brightness] delay-200 ease-in-out  will-change-transform transform-[scale(2)]" src={img} alt={title} />
                       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <line x1="33%" y1="0%" x2="33%" y2="100%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                            <line x1="66%" y1="0%" x2="66%" y2="100%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                            <line x1="0%" y1="33%" x2="100%" y2="33%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                            <line x1="0%" y1="66%" x2="100%" y2="66%" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
                           
                           
                            <circle cx="50%" cy="50%" r="7" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"/>
                            <circle cx="50%" cy="50%" r="2.5" fill="rgba(255,255,255,0.75)"/>
                          </svg>
                         
                        </div>
                      </div>
                    </div>
                  </div>
    )
}