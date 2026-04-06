import fullLogoImg from "../assets/DepthFlow_AI__1_-removebg-preview.png";
import VersionBadge from "./VersionBadge";

const FullLogo = () => {
  return (
    <div className="flex items-center">
      <div className="relative inline-block">
        <img
          src={fullLogoImg}
          alt="DepthFlow AI Full Logo"
          // Replaced h-full with a specific height like h-14 or h-16
          className="h-20 w-auto object-contain" 
        />
        <div className="absolute scale-[0.5] top-11 right-0">
          <VersionBadge />
        </div>
      </div>
    </div>
  );
};

export default FullLogo;