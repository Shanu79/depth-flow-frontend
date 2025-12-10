import {
  Twitter,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import FullLogo from './FullLogo';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 mt-20 bg-slate-950 py-10 px-6 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 h-16">
          <FullLogo/>
        </div>

        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white">
            About Us
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
        </div>

        <div className="flex gap-4">
          <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
          <Facebook className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
          <Youtube className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-gray-600">
        © 2025 via DepthFlow AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;