import LatestArrivalsSection from "@/components/home/LatestArrivalsSection";
import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import ExploreMore from "@/components/home/ExploreMore";

export const metadata = {
  title: "Welcome Home",
};

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <AboutSection />
      <LatestArrivalsSection />
      <ExploreMore />
    </main>
  );
}
