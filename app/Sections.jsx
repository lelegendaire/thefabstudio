// app/Sections.jsx
"use client"

import dynamic from 'next/dynamic'
import {useRef} from 'react'
const AboutUs = dynamic(() => import('./about_us_section'))
const Projects = dynamic(() => import('./projects'),{srr:false})
const Team = dynamic(() => import('./team_section'),{srr:false})
const Contact = dynamic(() => import('./contact_section'))
const Interaction = dynamic(() => import('./interaction'),{srr:false})
const Pricing = dynamic(() => import('./pricing'))
const Footer = dynamic(() => import('./footer_section'))

export default function Sections() {
  const contactRef = useRef(null)

  return (
    <>
      <AboutUs />
      <Projects />
      <Team contactRef={contactRef} />
      <Contact ref={contactRef} />
      <Interaction />
      <Pricing/>
      <Footer />
    </>
  )
}
