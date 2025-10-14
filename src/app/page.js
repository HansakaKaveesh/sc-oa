import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import Specializations from "./components/Specializations";
import Clubs from "./components/Clubs";
import CatchUps from "./components/CatchUps";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhatWeDo />
      <Specializations />
      <Clubs />
      <CatchUps />
      <Footer />
    </>
  );
}