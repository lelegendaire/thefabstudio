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
  const [formData, setFormData] = useState({
    email: '',
    object: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')

  const tabs = [
    { key: 'idea', label: 'Idea' },
    { key: 'question', label: 'Question' },
    { key: 'project', label: 'Project' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          category: tabs.find(t => t.key === selectedTab)?.label
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('Email envoyé avec succès! ✅')
        setFormData({ email: '', object: '', message: '' })
        setSelectedTab('idea')
      } else {
        setStatus('Erreur lors de l\'envoi. ❌')
      }
    } catch (error) {
      setStatus('Erreur lors de l\'envoi. ❌')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const slides = [
  {
    id: 0,
    content: (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <ChartContainer className="w-3/4 h-full font-bold" config={chartConfig}>
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
            <Bar dataKey="client" fill="#b98d6b" radius={20} />
          </BarChart>
        </ChartContainer>
        <h1 className=" font-bold py-4">We have lot of client </h1>
      </div>
    ),
  },
  {
    id: 1,
    content: ( 
      <div className="w-full h-full flex items-center justify-center flex-col">
        
        <iframe className="w-[80%] h-[80%] object-cover rounded-xl" width="500" height="300" allow="geolocation" src="https://api.maptiler.com/maps/019a29ee-fc6c-7214-992b-1d1cfeb51a7d/?key=OVKTtEmd6oXqJWFoFhnn#11.1/48.85582/2.37502"></iframe>
      
       <h1 className=" font-bold py-4">We are here </h1>
       </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="w-full h-[30vh] flex items-center justify-center flex-col">
        <img
          className="w-[70%] h-[200%] object-cover rounded-xl"
          src="/medias/Contact.webp"
          alt="Dune with beige fog"
          width="500" height="300"
        />
        <h1 className=" font-bold py-4">Contact us </h1>
      </div>
    ),
  },
]
    return (
        <section id="contact_section" ref={ref} className="h-[150vh] w-full bg-white p-4 rounded-4xl relative" style={{ transform: "translateY(-105%) scale(0.05)" }}>
            <h1 className="font-bold sm:text-8xl text-3xl text-black">Let’s work together</h1>
            <h1 className="font-bold sm:text-3xl text-sm"> — even just to explore.</h1>
            <div className="flex items-center justify-between flex-col sm:flex-row">
             <div className="flex sm:w-1/2 w-full sm:h-[80vh] h-[40vh] flex-col items-center justify-center"> 
             <div className="slider w-full h-full flex items-center justify-center">
               {slides[activeIndex].content}
        
      
        </div>
         <div className="flex justify-center items-center gap-1 py-4">
        {slides.map((_, index) => (
          <button
  key={index}
  type="button"
  aria-label={`Afficher le slide ${index + 1}`}
  aria-current={index === activeIndex ? "true" : undefined}
  onClick={() => setActiveIndex(index)}
  className="relative w-12 h-12 flex items-center justify-center"
>
   <span
    className={`transition-all duration-300 focus-visible:outline-2 focus-visible:outline-black ${
      index === activeIndex
        ? "w-8 h-2 rounded-2xl bg-black"
        : "w-2 h-2 rounded-full bg-gray-400"
    }`}
  />
  <span className="sr-only">
    Afficher le slide {index + 1}
  </span>
</button>

        ))}
      </div>
        </div>
        <div className="pt-20 flex w-full sm:w-1/2 h-screen items-center justify-center flex-col">
        <h1 className="text-3xl">Formulaire</h1>
        
        <div className="flex gap-1 items-start sm:w-100 w-full pl-5 pt-5"><p>To:</p> <p className="w-auto bg-[#b98d6b8c] pt-0.5 pb-0.5 pr-1.5 pl-1.5 rounded-md">thefabstudio2@gmail.com</p></div>
        <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center sm:w-100 w-full">
        <div className="p-5 w-full">
            <h1>Email*</h1>
            <input type="mail" placeholder="myemail@gmail.com" className=" w-full h-12 min-h-12 outline-0" value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required></input>
        </div>
        <div className="h-0.5 sm:w-100 w-full bg-gray-200 rounded-2xl "></div>
        <div className="pl-5 pt-5 w-full">
            <h1 className="pt-3 ">Object*</h1>
            <input type="text" placeholder="An idea, a question, a project... ?" className="w-full outline-0 h-12 min-h-12" value={formData.object}
            onChange={(e) => handleChange('object', e.target.value)}
            required></input>
            <div className="flex gap-2 sm:gap-3 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`min-h-12 rounded-2xl px-4 py-3 text-sm transition-all duration-200 flex items-center justify-center ${
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
            <textarea type="text" placeholder="Tell us all about it! Tell us about your idea, your desires or what you're looking for." className="h-48 min-h-48 w-full outline-0" value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            required></textarea>
            <button  type="submit"
            disabled={isLoading} className="bg-black text-white rounded-2xl px-4 py-3 flex items-center justify-center">{isLoading ? 'Envoi en cours...' : 'Send'}</button>
            {status && (
            <p className={`mt-2 text-sm ${status.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {status}
            </p>
          )}
        </div>
        <div className="h-0.5 w-100/100 bg-gray-200 rounded-2xl "></div>


        </form>
       </div>
      </div>
        </section>
    )
})
export default Contact;