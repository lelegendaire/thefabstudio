// app/sections/AboutUsContent.jsx (PAS de "use client")
import Copy from '../../components/Copy'

export default function AboutUsContent() {
  return (
    <div className="z-10 relative">
      <Copy>
        <h1 className="font-bold sm:text-8xl text-5xl bg-black sm:w-2xl w-full z-10 relative">
          About Us
        </h1>
      </Copy>
      
      <Copy>
        <p className="sm:w-2xl w-xs ml-auto sm:text-2xl text-xs">
          It all started with a simple thought, on a summer afternoon in 2023:
          what if I built a studio capable of creating truly unique websites,
          tailored to every person? It was just a dream, but already a strong
          conviction.
        </p>
      </Copy>
      
      <Copy>
        <p className="sm:w-2xl w-xs mr-auto sm:text-2xl text-xs sm:mt-80 mt-20">
          For a year, I worked on my first site – a project that would
          eventually allow people to easily create customizable websites. A
          year of testing, coding, and countless nights imagining how to make
          the web more original.
        </p>
      </Copy>
      
      <Copy>
        <p className="sm:w-2xl w-xs ml-auto sm:text-2xl text-xs sm:mt-80 mt-20">
          After months of work, the site was finally deployed. The Fab Studio
          officially came to life. I created an Instagram account to share
          ideas and my first creations.
        </p>
      </Copy>
      
      <Copy>
        <p className="sm:w-2xl w-xs mr-auto sm:text-2xl text-xs sm:mt-120 mt-40 sm:mb-50 mb-10">
          The Fab Studio was born of a desire to push back the boundaries of
          the web. A visual laboratory where innovation, aesthetics and
          interactivity meet to invent unique experiences.
        </p>
      </Copy>
    </div>
  )
}