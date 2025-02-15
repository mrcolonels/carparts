import Hero from '@/components/Hero'
import LatestProducts from '@/components/LatestProducts'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'

export default function Home() {
  return (
    <main>
      <FadeIn>
        <Hero />
      </FadeIn>
      <LatestProducts />
      <Footer />
    </main>
  )
} 