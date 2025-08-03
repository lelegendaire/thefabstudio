"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState, forwardRef  } from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/ui/chart"
const chartData = [
  { month: "January", visiteur: 186, client: 80 },
  { month: "February", visiteur: 305, client: 200 },
  { month: "March", visiteur: 237, client: 120 },
  { month: "April", visiteur: 73, client: 190 },
  { month: "May", visiteur: 209, client: 130 },
  { month: "June", visiteur: 214, client: 140 },
]
const chartConfig = {
  visiteur: {
    label: "Visiteur",
    color: "#000",
  },
  client: {
    label: "Client",
    color: "#506dfd",
  },
};

const Contact = forwardRef((props, ref) => {
    const [selectedTab, setSelectedTab] = useState("perso");
     const [activeIndex, setActiveIndex] = useState(0)


  const tabs = [
    { key: "perso", label: "Perso" },
    { key: "pro", label: "Pro" },
    { key: "autre", label: "Autre" },
  ];
  const slides = [
  {
    id: 0,
    content: (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <ChartContainer className="w-3/4 h-full font-[Satoshi] font-bold" config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="visiteur" fill="#000" radius={20} />
            <Bar dataKey="client" fill="#506dfd" radius={20} />
          </BarChart>
        </ChartContainer>
        <h1 className="font-[Satoshi] font-bold py-4">We have lot of client </h1>
      </div>
    ),
  },
  {
    id: 1,
    content: ( 
      <div className="w-full h-full flex items-center justify-center text-3xl flex-col">🌍 Map 3D ici
      
       <h1 className="font-[Satoshi] font-bold py-4">We have lot of client </h1>
       </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <img
          className="w-[80%] h-[80%] object-cover rounded-xl"
          src="https://images.unsplash.com/photo-1753516373564-d41bdaa6d71a?w=600&auto=format&fit=crop&q=60"
          alt="slide"
        />
         <h1 className="font-[Satoshi] font-bold py-4">We have lot of client </h1>
      </div>
    ),
  },
]
    return (
        <section id="contact_section" ref={ref} className="h-[150vh] bg-white p-4 rounded-4xl relative" style={{ transform: "translateY(-105%) scale(0.05)" }}>
            <h1 className="font-[Satoshi] font-bold text-8xl text-black">Let’s work together</h1>
            <h1 className="font-[Satoshi] font-bold text-3xl"> — even just to explore.</h1>
            <div className="flex items-center justify-between">
             <div className="flex w-1/2 h-[80vh] flex-col items-center justify-center"> 
             <div className="slider w-full h-full flex items-center justify-center">
               {slides[activeIndex].content}
        
      
        </div>
         <div className="flex justify-center items-center gap-1 py-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 ${
              index === activeIndex ? "w-8 h-2 rounded-2xl bg-black" : "w-2 h-2 rounded-full bg-gray-400"
            }`}
          />
        ))}
      </div>
        </div>
        <div className="pt-20 flex  h-screen items-center justify-center flex-col font-[Satoshi] font-bold">
        <h1 className="text-3xl">Formulaire</h1>
        
        <div className="flex gap-1 items-start w-100 pl-5 pt-5"><p>To:</p> <p className="w-auto bg-[#506dfd87] pt-0.5 pb-0.5 pr-1.5 pl-1.5 rounded-md">thefabstudio2@gmail.com</p></div>
        <div className="flex flex-col items-start justify-center w-100">
        <div className="p-5 w-full">
            <h1>Email*</h1>
            <input type="mail" placeholder="myemail@gmail.com" className=" w-full h-10 outline-0"></input>
        </div>
        <div className="h-0.5 w-100 bg-gray-200 rounded-2xl "></div>
        <div className="pl-5 pt-5 w-full">
            <h1 className="pt-3 ">Object*</h1>
            <input type="text" placeholder="An idea, a question, a project... ?" className="w-full outline-0 h-10"></input>
            <div className="flex gap-2 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`rounded-2xl px-3 py-2 text-sm transition-all duration-200 ${
              selectedTab === tab.key
                ? "bg-black text-white"
                : "bg-[#f5eeee] text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
            
        </div>
        <div className="p-5 w-full">
            <h1 className="pt-3 pb-3">Your message*</h1>
            <textarea type="text" placeholder="Tell us all about it! Tell us about your idea, your desires or what you're looking for." className="h-40 w-full outline-0"></textarea>
            <button className="bg-black text-white rounded-2xl px-3 py-2 flex items-center justify-center">Send</button>
        </div>
        <div className="h-0.5 w-100 bg-gray-200 rounded-2xl "></div>


        </div>
       </div>
      </div>
        </section>
    )
})
export default Contact;