import Hero from "./components/hero";
import HeroOptions from "./components/hero-options";

export default function PageContent() {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-12">
        <Hero />
        <HeroOptions />
      </div>
    </>
  );
}
