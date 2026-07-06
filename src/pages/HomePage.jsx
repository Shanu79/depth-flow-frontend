import Hero from "../components/Hero";
import Features from "../components/Features";
import HomeGallery from "../components/HomeGallery";
import FAQ from "../components/Faq";
import ComparisonTable from "../components/Comparision";

import AppBannerImage from "../assets/DepthflowAI App Banner Phone.png";
import AppBannerImagePhone from "../assets/DepthflowAI App Banner.png";

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <HomeGallery />
    <ComparisonTable />
    <FAQ />

    {/* 
      Edge-to-Edge Full Width Banner 
      - bg-[#f4f5f9] ensures the light background stretches indefinitely on ultrawide screens.
      - Centered using flexbox (flex justify-center) on the inner wrapper.
    */}
    <div
      id="app-banner"
      className="w-full scroll-mt-24 bg-[#f4f5f9] flex justify-center"
    >
      <div className="w-full max-w-[1920px] flex justify-center items-center">
        
        {/* MOBILE IMAGE: Shows by default, hides on medium (md) screens and up */}
        <img
          alt="DepthFlow AI App Banner Mobile"
          src={AppBannerImagePhone}
          className="block md:hidden w-full h-auto object-contain"
        />

        {/* DESKTOP IMAGE: Hidden by default, shows on medium (md) screens and up */}
        <img
          alt="DepthFlow AI App Banner Desktop"
          src={AppBannerImage}
          className="hidden md:block w-full lg:w-[57%] h-auto object-contain"
        />

      </div>
    </div>
  </>
);

export default HomePage;