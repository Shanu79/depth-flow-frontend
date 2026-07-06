import Hero from "../components/Hero";
import Features from "../components/Features";
import HomeGallery from "../components/HomeGallery";
import FAQ from "../components/Faq";
import ComparisonTable from "../components/Comparision";
// Make sure this points to your new image file
import AppBannerImage from "../assets/DepthflowAI App Banner.png"; 

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <HomeGallery />
    <ComparisonTable />
    <FAQ />
    
    {/* ID added for Navbar scrolling, scroll-mt-24 prevents navbar overlap */}
    <div id="app-banner" className="flex items-center justify-center w-full max-w-[1400px] mx-auto px-4 my-20 scroll-mt-24">
        <img 
          alt="DepthFlow AI App Banner" 
          src={AppBannerImage} 
          className="w-full h-auto object-contain" 
        />
    </div>
  </>
);

export default HomePage;