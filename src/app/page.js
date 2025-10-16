import Hero from "./components/Hero";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import Specializations from "./components/Specializations";
import Clubs from "./components/Clubs";
import CatchUps from "./components/CatchUps";
import PopupAd from "./components/PopupAd";

export default function Home() {
  return (
    <>
      <PopupAd
        title="Join our next adventure!"
        description="Hikes, socials, and service events. Sign up now—limited slots for the upcoming trip."
        imageSrc="/ads/ad-social.jpg"          // optional: replace with your image
        ctaText="Sign up"
        ctaHref="https://forms.gle/YOUR_FORM_ID" // replace with your Google Form
        delayMs={1200}                           // show after 1.2s
        cooldownDays={7}                         // re-show after 7 days
        storageKey="popup_ad_social_adventure"   // unique key per campaign
      />

      <Hero />
      <About />
      <WhatWeDo />
      <Specializations />
      <Clubs />
      <CatchUps />
    </>
  );
}