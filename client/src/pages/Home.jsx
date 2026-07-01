import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import BloodGroups from "../components/BloodGroups";
import WhyDonate from "../components/WhyDonate";
import Footer from "../components/Footer";
import EmergencyRequest from "../components/EmergencyRequest";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Stats />

      <BloodGroups />

      <WhyDonate />

      <EmergencyRequest />
     
      <Testimonials />

      <Footer />
    </>
  );
}

export default Home;