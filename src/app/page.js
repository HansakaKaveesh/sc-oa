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
        title="OFFICIAL WRISTBAND!"
        text="EXCLUSIVE OPENARC CAMPUS WRISTBANDS."
        imageSrc="/WB post.png"
        ctaText="Buy Now"
        ctaHref="/buy-wristband"
      />
    </>
  );
}