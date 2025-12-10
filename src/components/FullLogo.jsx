import fullLogoImg from '../assets/DepthFlow_AI__1_-removebg-preview.png';

const FullLogo = () => {
  return (
    <div className="flex items-center gap-2 h-full"> 
    <img 
        src={fullLogoImg}
        alt="DepthFlow AI Full Logo"
        className="h-full w-auto object-contain" 
    />
    </div>
  );
}

export default FullLogo;