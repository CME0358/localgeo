import { HashScrollOnLoad } from '@/components/HashScrollOnLoad';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Comparison } from '@/components/sections/Comparison';
import { Industries } from '@/components/sections/Industries';
import { LocalGeo } from '@/components/sections/LocalGeo';
import { CaseStudy } from '@/components/sections/CaseStudy';
import { Diagnosis } from '@/components/sections/Diagnosis';
import { FAQ } from '@/components/sections/FAQ';
import { Pricing } from '@/components/sections/Pricing';
import { Future } from '@/components/sections/Future';

export default function HomePage() {
  return (
    <>
      <HashScrollOnLoad />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Comparison />
        <Industries />
        <LocalGeo />
        <CaseStudy />
        <Diagnosis />
        <FAQ />
        <Pricing />
        <Future />
      </main>
      <Footer />
    </>
  );
}
