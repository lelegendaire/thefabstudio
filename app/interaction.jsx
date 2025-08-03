"use client"
import Copy from "./components/Copy"
export default function Interaction(){
    return(
        <section className="h-[150vh] bg-black p-4 font-[Satoshi] text-white flex items-center justify-start flex-col ">
        <Copy><h1 className="font-bold text-6xl p-10">Still not convinced</h1></Copy>
        <Copy><h3 className="font-bold text-3xl p-5 text-center">Here you can try our prototype and personalisable each site in your vision to have a glimpse</h3></Copy>
        <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center flex-col">
                <div className="h-100 rounded-2xl overflow-hidden "><img className="w-full h-full object-cover transition-transform object-center hover:transform-[scale(1.2)]" src={"https://images.unsplash.com/photo-1752041593295-29a7546096e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D"}></img></div>
                <h1>Our work 1</h1>
                <button className="bg-white w-60 rounded-4xl p-2 text-black">I will try</button>
            </div>
            <div className="flex items-center justify-center flex-col">
                <div className="h-100 rounded-2xl overflow-hidden "><img className="w-full h-full object-cover transition-transform object-center hover:transform-[scale(1.2)]" src={"https://images.unsplash.com/photo-1752805936163-73fe92f5070d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D"}></img></div>
                <h1>Our work 2</h1>
                <button className="bg-white w-60 rounded-4xl p-2 text-black">Try</button>
            </div>
            <div className="flex items-center justify-center flex-col">
                <div className="h-100 rounded-2xl overflow-hidden "><img className="w-full h-full object-cover transition-transform object-center hover:transform-[scale(1.2)]" src={"https://plus.unsplash.com/premium_photo-1746417461105-51b89a61907f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D"}></img></div>
                <h1>Our work 3</h1>
                <button className="bg-white w-60 rounded-4xl p-2 text-black">Try</button>
            </div>
        </div>
        </section>
    )
}