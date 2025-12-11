import Hero from "./components/Hero";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import Specializations from "./components/Specializations";
import Clubs from "./components/Clubs";
import CatchUps from "./components/CatchUps";
import AdPopup from "./components/AdPopup"; // ➜ add this

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatWeDo />
      <Specializations />
      <Clubs />
      <CatchUps />

      {/* Popup Ad */}
      <AdPopup
        campaignId="nov-2025-events"          // change to reset for new campaigns
        delayMs={1200}
        frequencyMinutes={5}
        oncePerSession={false}
        title="HEARTS FOR HOPE!"
        text="Help Families Affected by the Floods"
        imageSrc="/Hope .png"
        ctaText="Donate Now"
        ctaHref="https://forms.gle/1CZQpEsCQXWdQ8Nu5"
      />
    </>
  );
}