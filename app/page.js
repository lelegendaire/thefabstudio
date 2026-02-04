// app/page.js (SERVER)
import HeroSection from './HeroSection'
import Sections from './Sections'
export default function Home() {
   return (
    <main id="main-content">
      <HeroSection />
      <Sections />
    </main>
  )
}
