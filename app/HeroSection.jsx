// app/HeroSection.jsx
"use client"

import { useRef, useState } from 'react'
import Loader from './loader/loader'
import Hero from './hero'

export default function HeroSection() {
  return (
    <Loader>
      <Hero />
    </Loader>
  )
}
