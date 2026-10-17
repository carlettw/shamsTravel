import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { PopularTours } from "@/components/sections/PopularTours";
import { Destinations } from "@/components/sections/Destinations";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaSection } from "@/components/sections/CtaSection";
import { getHomePageData } from "@/lib/home-data";
import { Reveal } from "@/components/shared/Reveal";

interface Props {
  params: Promise<{ lng: string }>;
}

export default async function Home({ params }: Props) {
  const { lng } = await params;
  const { featuredTours, totalTours, countries, reviews, siteStats } = await getHomePageData(lng);

  return (
    <>
      <Hero />
      <WhyUs />
      {featuredTours.length > 0 && <PopularTours tours={featuredTours} />}
      <Stats totalTours={totalTours} reviews={reviews} siteStats={siteStats} />
      {countries.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Reveal><Destinations countries={countries} /></Reveal>
        </div>
      )}
      {reviews.length > 0 && (
        <div className="bg-muted/60 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <Reveal><Testimonials reviews={reviews} /></Reveal>
          </div>
        </div>
      )}
      <CtaSection lng={lng} />
    </>
  );
}
